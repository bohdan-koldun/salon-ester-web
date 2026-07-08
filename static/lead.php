<?php
// lead.php — приймає заявки з форм сайту, валідує і пересилає в Telegram + email.
// Секрети (токен/chat_id) — у tg-secrets.php (поза git) або в env-змінних сервера.

header('Content-Type: application/json; charset=utf-8');

[$botToken, $chatId, $leadEmail] = load_secrets(__DIR__);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// Honeypot: боту вдаємо успіх — нічого не надсилаючи.
if (!empty($_POST['company'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$phone = clean_input($_POST['phone'] ?? '');
if (mb_strlen($phone) <= 5) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'phone']);
    exit;
}

$name    = clean_input($_POST['name'] ?? '');
$message = clean_input($_POST['message'] ?? '');
$form    = clean_input($_POST['form'] ?? '');
$pageUrl = clean_input($_POST['url'] ?? '');

$lines = array_filter([
    '<b>🔔 Новий лід — Естер</b>',
    not_empty($form)    ? "<u>Форма</u>: $form"             : null,
    not_empty($name)    ? "<u>Ім'я</u>: $name"              : null,
    not_empty($phone)   ? "<u>Телефон</u>: $phone"          : null,
    not_empty($message) ? "<u>Повідомлення</u>: $message"   : null,
    not_empty($pageUrl) ? "<u>Сторінка</u>: $pageUrl"       : null,
]);

$text = implode("\n\n", $lines);

$okTelegram = send_to_telegram($botToken, $chatId, $text);
send_email($leadEmail, "Новий лід: $form. $name", $text);

echo json_encode(['ok' => $okTelegram]);

// ─── Доставка ────────────────────────────────────────────────

function send_to_telegram($token, $chatId, $text) {
    if ($token === '' || $chatId === '') return false;
    $url = "https://api.telegram.org/bot$token/sendMessage";
    $payload = http_build_query([
        'chat_id'    => $chatId,
        'parse_mode' => 'html',
        'text'       => $text,
    ]);

    // Основний шлях — cURL (працює навіть коли allow_url_fopen вимкнено на хостингу).
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
        ]);
        $resp = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($resp !== false) {
            // Сервер відповів — успіх лише якщо Telegram підтвердив ok:true.
            return $code === 200 && strpos($resp, '"ok":true') !== false;
        }
        // cURL не зміг з'єднатися — пробуємо запасний шлях нижче.
    }

    // Запасний шлях — stream context.
    $ctx = stream_context_create(['http' => [
        'method'        => 'POST',
        'header'        => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content'       => $payload,
        'timeout'       => 10,
        'ignore_errors' => true,
    ]]);
    $resp = @file_get_contents($url, false, $ctx);
    return $resp !== false && strpos($resp, '"ok":true') !== false;
}

function send_email($to, $subject, $htmlText) {
    if ($to === '') return;
    $body = trim(preg_replace('/<[^>]+>/', '', $htmlText));
    @mail($to, $subject, $body, "Content-Type: text/plain; charset=\"utf-8\"\r\nFrom: $to");
}

// ─── Утиліти ─────────────────────────────────────────────────

function rh_secrets($dir) {
    static $cache = null;
    if ($cache !== null) return $cache;
    $cache = [];
    foreach ([dirname($dir) . '/tg-secrets.php', $dir . '/tg-secrets.php'] as $file) {
        if (file_exists($file)) {
            $loaded = require $file;
            if (is_array($loaded)) $cache = $loaded;
            break;
        }
    }
    return $cache;
}

function load_secrets($dir) {
    $s = rh_secrets($dir);
    return [
        getenv('TELEGRAM_BOT_TOKEN') ?: ($s['bot_token'] ?? ''),
        getenv('LEAD_TELEGRAM_CHAT_ID') ?: getenv('TELEGRAM_CHAT_ID') ?: ($s['lead_chat_id'] ?? $s['chat_id'] ?? ''),
        getenv('LEAD_EMAIL') ?: ($s['lead_email'] ?? ''),
    ];
}

function clean_input($data) {
    return htmlspecialchars(trim(stripslashes((string) $data)), ENT_QUOTES, 'UTF-8');
}

function not_empty($s) {
    return isset($s) && trim($s) !== '';
}

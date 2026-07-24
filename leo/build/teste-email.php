<?php
// REMOVER ESTE ARQUIVO APÓS OS TESTES
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'envio@centroauditivomacae.com.br';
$smtp_pass = '|v05HLDr!>Q';
$from_addr = 'envio@centroauditivomacae.com.br';
$to_addr   = 'loja00004@gmail.com';

$log = [];

$sock = @fsockopen("ssl://$smtp_host", $smtp_port, $errno, $errstr, 15);
if (!$sock) {
    die("ERRO ao conectar: [$errno] $errstr");
}

$r = function () use ($sock, &$log) {
    $line = fgets($sock, 512);
    $log[] = "S: " . trim($line);
    return $line;
};
$w = function ($s) use ($sock, &$log) {
    $log[] = "C: $s";
    fwrite($sock, $s . "\r\n");
};

$r();
$w("EHLO centroauditivomacae.com.br");
while (($line = $r()) && substr($line, 3, 1) === '-');

$w("AUTH LOGIN");
$r();
$w(base64_encode($smtp_user));
$r();
$w(base64_encode($smtp_pass));
$auth = trim($r());
$log[] = "AUTH result: $auth";

if (substr($auth, 0, 3) !== '235') {
    echo "<pre>FALHA NA AUTENTICAÇÃO:\n" . implode("\n", $log) . "</pre>";
    fclose($sock);
    exit;
}

$w("MAIL FROM:<$from_addr>");
$r();
$w("RCPT TO:<$to_addr>");
$r();
$w("DATA");
$r();

$msg  = "From: envio@centroauditivomacae.com.br\r\n";
$msg .= "To: $to_addr\r\n";
$msg .= "Subject: Teste SMTP Centro Auditivo\r\n";
$msg .= "MIME-Version: 1.0\r\n";
$msg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$msg .= "Teste de envio funcionando! Data: " . date('d/m/Y H:i:s') . "\r\n.";
$w($msg);
$result = trim($r());

$w("QUIT");
fclose($sock);

echo "<pre>";
echo implode("\n", $log) . "\n\n";
echo substr($result, 0, 3) === '250' ? "✅ EMAIL ENVIADO COM SUCESSO!" : "❌ ERRO: $result";
echo "</pre>";

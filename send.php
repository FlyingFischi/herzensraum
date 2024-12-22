<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Zuerst das Captcha validieren
    if (isset($_POST['captcha']) && $_POST['captcha'] == 7) {

    // Sammeln Sie die Formulardaten
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $reference = $_POST["reference"];
    $size = $_POST["size"];
    $colors = $_POST["colors"];
    $consent = isset($_POST["consent"]) ? "Ja" : "Nein";
    $notes = $_POST["notes"];

    // Empfänger-E-Mail-Adressen
    $to_primary = "s.fischer374@protonmail.com";

    // Absenderadresse
    $from = "s.fischer374@protonmail.com";

    // Betreff
    $subject = "Neue Anfrage von $firstname $lastname";

    // Nachricht zusammenstellen mit HTML-Formatierung
    $message = '<html>
    <body>
        <!-- Benutzerdefinierte Nachricht vor dem Formularfeld -->
        <p><strong>Vielen Dank für Ihre Anfrage. Hier sind die Details:</strong></p>
        <!-- Dein HTML-Code aus contact.html -->
        <p><strong>Vorname:</strong> ' . $firstname . '</p>
        <p><strong>Nachname:</strong> ' . $lastname . '</p>
        <p><strong>E-Mail:</strong> ' . $email . '</p>
        <p><strong>Nachricht:</strong> ' . $notes . '</p>
        <!-- Benutzerdefinierte Nachricht vor dem Formularfeld -->
        <p><strong>Ich werde mich so schnell wie möglich mit Ihnen in Verbindung setzen.</strong></p>        
    </body>
    </html>';

    // E-Mail-Konfiguration für PHPMailer
    $mail = new PHPMailer(true);

    // Kodierung auf UTF-8 setzen
    $mail->CharSet = 'UTF-8';

    try {
        //Server-Einstellungen
        $mail->SMTPDebug = 0; // 0 für keinen Debug-Output, 2 für detaillierten Debug-Output
        $mail->isSMTP();
        $mail->Host = 'host286.checkdomain.de'; // Ihren SMTP-Host hier eintragen
        $mail->SMTPAuth = true;
        $mail->Username = 'artbybodicco@bodicco.com'; // Ihre SMTP-E-Mail-Adresse hier eintragen
        $mail->Password = 'HeKo46!!'; // Ihr SMTP-Kennwort hier eintragen
        $mail->SMTPSecure = 'ssl'; // tls oder ssl, je nach Ihren Servereinstellungen
        $mail->Port = 465; // Port-Nummer anpassen, wenn erforderlich

        //Empfänger und Inhalt
        $mail->setFrom($from);
        $mail->addAddress($to_primary);
        $mail->addCC($email); // Hinzufügen der Kopie an den Absender
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $message;

        // E-Mail senden an den Hauptempfänger
        $mail->send();

        // Hier können Sie eine Weiterleitung oder eine Erfolgsmeldung hinzufügen
        header("Location: danke.html");
        exit();
    } catch (Exception $e) {
        // Hier können Sie Fehler behandeln, z.B. Fehlermeldung ausgeben
        echo "Fehler beim Senden der E-Mail: {$mail->ErrorInfo}";
    }

} else {
    // Falls das Captcha falsch ist
    echo "The answer to the math question was incorrect. Please try again.";
}

} else {
    // Falls jemand versucht, die Datei direkt aufzurufen
    echo "Fehler: Ungültiger Zugriff auf diese Seite.";
    // Hier können Sie alternative Aktionen ergänzen, zum Beispiel eine Weiterleitung zu Ihrer Startseite.
    // header("Location: index.html");
    exit();
}
?>

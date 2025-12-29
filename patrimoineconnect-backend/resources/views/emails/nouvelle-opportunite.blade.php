<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Nouvelle Opportunité</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
        <h1 style="color: #8B5E3C;">🎉 Nouvelle Opportunité Publiée !</h1>
        
        <p>Bonjour,</p>
        
        <p>Une nouvelle opportunité vient d'être publiée sur <strong>Patrimoine Connecté</strong> :</p>
        
        <div style="background: #FAF7F2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a8a; margin-top: 0;">{{ $opportunite->title }}</h2>
            <p><strong>📍 Localisation :</strong> {{ $opportunite->location ?? 'Non spécifiée' }}</p>
            <p><strong>👤 Publié par :</strong> {{ $opportunite->user->name ?? 'Utilisateur' }}</p>
            <p><strong>📅 Date :</strong> {{ $opportunite->created_at->format('d/m/Y à H:i') }}</p>
        </div>

        <p style="color: #666;">Connectez-vous pour voir les détails de cette opportunité.</p>
        
        <p>Cordialement,<br><strong>L'équipe Patrimoine Connecté</strong></p>
    </div>
</body>
</html>

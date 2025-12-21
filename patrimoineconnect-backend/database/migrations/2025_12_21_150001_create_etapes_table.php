<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécuter la migration : créer la table
     */
    public function up(): void
    {
        Schema::create('etapes', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            
            $table->string('couleur');
        
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etapes');
    }
};

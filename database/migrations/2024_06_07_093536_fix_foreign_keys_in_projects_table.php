<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop the incorrect foreign key constraints if they exist
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);

            // Add the correct foreign key constraints
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop the foreign key constraints
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);

            // Optionally, you can restore the old foreign keys if needed
            // $table->foreign('created_by')->references('id')->on('projects')->onDelete('cascade')->onUpdate('cascade');
            // $table->foreign('updated_by')->references('id')->on('projects')->onDelete('cascade')->onUpdate('cascade');
        });
    }
};
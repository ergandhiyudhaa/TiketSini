<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreignId('order_id')
                ->after('id')
                ->constrained('orders')
                ->cascadeOnDelete();

            $table->foreignId('order_item_id')
                ->after('order_id')
                ->constrained('order_items')
                ->cascadeOnDelete();

            $table->foreignId('ticket_type_id')
                ->after('order_item_id')
                ->constrained('ticket_types')
                ->restrictOnDelete();

            $table->string('ticket_number')
                ->after('ticket_type_id')
                ->unique();

            $table->string('ticket_code', 64)
                ->after('ticket_number')
                ->unique();

            $table->string('status')
                ->after('ticket_code')
                ->default('active');

            $table->timestamp('checked_in_at')
                ->after('status')
                ->nullable();

            $table->index(['order_id', 'status']);
            $table->index(['order_item_id']);
            $table->index(['ticket_type_id']);
        });
    }

    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['order_item_id']);
            $table->dropForeign(['ticket_type_id']);

            $table->dropUnique(['ticket_number']);
            $table->dropUnique(['ticket_code']);

            $table->dropIndex(['order_id', 'status']);
            $table->dropIndex(['order_item_id']);
            $table->dropIndex(['ticket_type_id']);

            $table->dropColumn([
                'order_id',
                'order_item_id',
                'ticket_type_id',
                'ticket_number',
                'ticket_code',
                'status',
                'checked_in_at',
            ]);
        });
    }
};

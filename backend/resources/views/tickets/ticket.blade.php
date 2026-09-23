<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>TiketSini Ticket</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            padding: 30px;
            background: #f5f7fb;
            color: #1f2937;
        }

        .ticket {
            background: #ffffff;
            border-radius: 16px;
            padding: 30px;
            border: 1px solid #e5e7eb;
        }

        .brand {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 25px;
        }

        .event-name {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .ticket-type {
            font-size: 15px;
            color: #6b7280;
            margin-bottom: 25px;
        }

        .section {
            margin-top: 20px;
        }

        .label {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .value {
            font-size: 15px;
            font-weight: bold;
        }

        .code-box {
            margin-top: 30px;
            padding: 20px;
            border: 2px dashed #d1d5db;
            text-align: center;
        }

        .ticket-code {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-top: 10px;
        }

        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 11px;
            color: #6b7280;
        }
    </style>
</head>

<body>

<div class="ticket">

    <div class="brand">
        TiketSini
    </div>

    <div class="event-name">
        {{ $event?->title ?? 'Event' }}
    </div>

    <div class="ticket-type">
        {{ $ticket->orderItem?->ticket_name
            ?? $ticket->ticketType?->name
            ?? 'Ticket' }}
    </div>

    <div class="section">
        <div class="label">Ticket Holder</div>
        <div class="value">
            {{ $ticket->order?->user?->name ?? '-' }}
        </div>
    </div>

    <div class="section">
        <div class="label">Email</div>
        <div class="value">
            {{ $ticket->order?->user?->email ?? '-' }}
        </div>
    </div>

    <div class="section">
        <div class="label">Event Date</div>
        <div class="value">
            {{ $event?->starts_at?->format('d M Y H:i') ?? '-' }}
        </div>
    </div>

    <div class="section">
        <div class="label">Venue</div>
        <div class="value">
            {{ $event?->venue_name ?? '-' }}
        </div>
    </div>

    <div class="section">
        <div class="label">Order Number</div>
        <div class="value">
            {{ $ticket->order?->order_number ?? '-' }}
        </div>
    </div>

    <div class="section">
        <div class="label">Ticket Number</div>
        <div class="value">
            {{ $ticket->ticket_number }}
        </div>
    </div>

    <div class="code-box">

        @if(!empty($qrCode))
            <div style="margin-bottom: 15px;">
                <img
                    src="data:image/svg+xml;base64,{{ $qrCode }}"
                    style="width: 180px; height: 180px;"
                >
            </div>
        @endif

        <div class="label">Ticket Code</div>

        <div class="ticket-code">
            {{ $ticket->ticket_code }}
        </div>
    </div>

    <div class="footer">
        Please present this ticket at the event entrance.
        This ticket is valid for one admission only.
    </div>

</div>

</body>
</html>

<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CheckLeveSendMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($search_data)
    {
        //
        $this->search_data = $search_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->text('checkleve.sendmail')
            ->from("info@ff14-app.com", 'ただリーヴ券が溢れないようにしてくれるツール')
            ->subject('リーヴ券もうすぐ溢れます！')
            ->with(['search_data' => $this->search_data]);
    }
}

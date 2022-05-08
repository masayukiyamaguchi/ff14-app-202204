<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
//メール送信用ファサードを紐づける
use Illuminate\Support\Facades\Mail;
use App\Mail\CheckLeveSendMail;
use App\Models\checkleve\Checkleve_data;


class SendMailCommandCheckLeve extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:send_mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        //下記を追加・修正する
        $today = date("d");
        $today_1 = date("Y-m-".$today+1);
        $search_datas = Checkleve_data::where("lossdata",$today_1)->get();
        

        foreach($search_datas as $search_data){
            $send_mail = ["email" => $search_data->email];
            Mail::to($send_mail)->send(new CheckLeveSendMail($search_data));
        }       
        
        //上記までを追加・修正する

    }
}

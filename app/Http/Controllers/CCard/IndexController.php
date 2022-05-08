<?php

namespace App\Http\Controllers\CCard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(){
        return view('ccard.index',["error"=>""]);
    }
}

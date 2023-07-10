<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Budget;
use Carbon\Carbon;

class UserBudgetController extends Controller
{

    public function index(Request $request)
    {
        $query = Budget::query();

        if ($request->has('clientName')) {
            $query->where('nameClient', 'like', '%' . $request->input('clientName') . '%');
        }

        if ($request->has('sellerName')) {
            $query->where('nameSeller', 'like', '%' . $request->input('sellerName') . '%');
        }

        if ($request->has('startDate') && $request->has('endDate')) {
            $startDate = Carbon::createFromFormat('Y-m-d\TH:i:s', $request->input('startDate'));
            $endDate = Carbon::createFromFormat('Y-m-d\TH:i:s', $request->input('endDate'))->endOfDay();
            $query->whereBetween('dateAndTime', [$startDate, $endDate]);
        }

        $query->orderByDesc('dateAndTime');

        $budgets = $query->get();

        return response()->json([
            'status' => '200',
            'budgets' => $budgets
        ]);
    }

    public function readById($id)
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json([
                'status' => '404',
                'message' => 'Orçamento não encontrado!'
            ], 404);
        }
        return response()->json([
            'status' => '200',
            'budget' => $budget
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nameClient'=>'required',
            'nameSeller'=>'required',
            'description'=>'required',
            'value'=>'required',
            'dateAndTime'=>'required',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>'422',
                'error'=>$validator->errors()
            ]);
        }else{
            $model = new Budget();
            $model->nameClient = $request->nameClient;
            $model->nameSeller = $request->nameSeller;
            $model->description = $request->description;
            $model->value = $request->value;
            $model->dateAndTime = Carbon::createFromFormat('Y-m-d\TH:i:s', $request->dateAndTime);
            $model->save();
            return response()->json([
                'status' =>'200',
                'msg' => 'Orçamento cadastrado com sucesso!'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        if(Budget::where('id', $id)->exists()){
            $budget = Budget::find($id);
            $budget->nameClient = $request->nameClient;
            $budget->nameSeller = $request->nameSeller;
            $budget->description = $request->description;
            $budget->value = $request->value;
            $budget->save();
            return response()->json([
                'message' => 'Orçamento editado com sucesso!'
            ],200);
        } else{
            return response()->json([
                'message' => 'Orçamento não encontrado!'
            ], 404);
        }
    }

    public function delete($id)
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json([
                'status' => '404',
                'error' => 'Budget not found'
            ], 404);
        }

        $budget->delete();

        return response()->json([
            'status' => '200',
            'message' => 'Orçamento deletado com sucesso!'
        ]);
    }
}


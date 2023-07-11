<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Budget;
use Carbon\Carbon;
use App\Http\Requests\IndexBudgetRequest;
use App\Http\Requests\CreateBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;


/**
 * Class UserBudgetController
 * @package App\Http\Controllers\Budget
 */
class UserBudgetController extends Controller
{
    /**
     * Get budgets based on search criteria.
     *
     * @param Request $request The request object.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    public function index(IndexBudgetRequest $request)
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

    /**
     * Get a budget by its ID.
     *
     * @param int $id The budget ID.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    public function readById($id)
    {
        $budget = Budget::find($id);

        return response()->json([
            'status' => '200',
            'budget' => $budget
        ]);
    }

    /**
     * Create a new budget.
     *
     * @param Request $request The request object.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    public function create(CreateBudgetRequest $request)
    {
        $model = new Budget();
        $model->nameClient = $request->nameClient;
        $model->nameSeller = $request->nameSeller;
        $model->description = $request->description;
        $model->value = $request->value;
        $model->dateAndTime = Carbon::createFromFormat('Y-m-d\TH:i:s', $request->dateAndTime);
        $model->save();

         return response()->json([
            'status' => '200',
            'msg' => 'Orçamento cadastrado com sucesso!'
            ]);
    }

    /**
     * Update an existing budget.
     *
     * @param Request $request The request object.
     * @param int $id The budget ID.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    public function update(UpdateBudgetRequest $request, $id)
    {
        if (Budget::where('id', $id)->exists()) {
            $budget = Budget::find($id);
            $budget->nameClient = $request->nameClient;
            $budget->nameSeller = $request->nameSeller;
            $budget->description = $request->description;
            $budget->value = $request->value;
            $budget->save();

            return response()->json([
                'message' => 'Orçamento editado com sucesso!'
            ], 200);
        }
    }

    /**
     * Delete a budget by its ID.
     *
     * @param int $id The budget ID.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    public function delete($id)
    {
        $budget = Budget::find($id);

        $budget->delete();

        return response()->json([
            'status' => '200',
            'message' => 'Orçamento deletado com sucesso!'
        ]);
    }
}


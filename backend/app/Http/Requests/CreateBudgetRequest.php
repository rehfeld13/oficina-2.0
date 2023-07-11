<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nameClient' => 'required|string|max:255',
            'nameSeller' => 'required|string|max:255',
            'description' => 'required|string',
            'value' => 'required|numeric',
            'dateAndTime' => 'required|date_format:Y-m-d\TH:i:s',
        ];
    }
}

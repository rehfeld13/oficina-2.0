<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexBudgetRequest extends FormRequest
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
            'clientName' => 'nullable|string|max:255',
            'sellerName' => 'nullable|string|max:255',
            'startDate' => 'nullable|date_format:Y-m-d\TH:i:s',
            'endDate' => 'nullable|date_format:Y-m-d\TH:i:s',
        ];
    }

}

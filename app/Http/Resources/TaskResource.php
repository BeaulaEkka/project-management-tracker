<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'createdBy' => $this->createdBy ? new UserResource($this->createdBy) : null,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'project' => new ProjectResource($this->project),
            'updatedBy' => $this->updatedBy ? new UserResource($this->updatedBy) : null,
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,

        ];
    }
}

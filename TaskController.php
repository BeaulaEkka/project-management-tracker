<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        // Log the fromUserPage value for debugging
        Log::info('fromUserPage: ' . $request->fromUserPage);

        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login')->with('error', 'You must be logged in to create a task.');
        }

        /** @var $image \Illuminate\Http\Uploaded File */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        };

        Task::create($data);

        // if ($request->has('fromUserPage') && $request->fromUserPage) {
        //     return redirect()->route('user.show', $userId)->with('success', 'Task was successfully created');
        // }

        if ($request->fromUserPage) {
            return redirect()->route('user.show', $userId)->with('success', 'Task was successfully created');
        }

        return to_route('task.index')
            ->with('success', 'Task was successfully created');

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // $users = User::all();
        $task->load('assignedUser');

        return inertia('Task/Show', [
            'task' => new TaskResource($task),
            // 'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {

        Log::info('fromUserPage value Edit:', [$request->input('fromUserPage')]);
        Log::info('Request parameters:', $request->all());

        $data = $request->validated();
        $image = $request->file('image'); // Use `file` specifically for image uploads

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login')->with('error', 'You must be logged in to create a task.');
        }

        // Only update image if a new file is uploaded
        if ($image) {
            // Check if existing image path exists (avoid unnecessary deletion)
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);

        // Check if the request came from the user page
        if (request('fromUserPage')) {
            return redirect()->route('user.show',
                [$task->assigned_user_id])
                ->with('success', "Task \"$task->name\" was successfully updated");
        }

        return to_route('task.index')->with('success', "Task \"$task->name\" was updated");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')
            ->with('success', "Task \"$name\" was successfully deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

}

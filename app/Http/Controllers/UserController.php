<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\CrudUserResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }
        if (request('email')) {
            $query->where('email', 'like', "%" . request('email') . '%');
        }
        $users = $query->orderBy($sortField, $sortDirection)->paginate(10);
        // ->onEachSide(1);
        return inertia('User/Index', [
            'users' => CrudUserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        /** @var $image \Illuminate\Http\Uploaded File */
        $image = $data['image'] ?? null;

        if ($image) {
            $data['image_path'] = $image->store('user/' . Str::random(), 'public');
        };

        User::create($data);
        return to_route('user.index')
            ->with('success', 'User was successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // $tasks = DB::table('tasks')
        //     ->where('assigned_user_id', $user->id)
        //     ->get();
        $success = session('success');
        $tasks = Task::where('assigned_user_id', $user->id)->get();

        return inertia('User/Show', [
            'user' => new CrudUserResource($user),
            'queryParams' => request()->query() ?: null,
            // 'tasks' => $tasks,
            'tasks' => TaskResource::collection($tasks),
            'success' => $success,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new CrudUserResource($user),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }
        $image = $request->file('image'); // Use `file` specifically for image uploads

        // Only update image if a new file is uploaded
        if ($image) {
            // Check if existing image path exists (avoid unnecessary deletion)
            if ($user->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($user->image_path));
            }

            $data['image_path'] = $image->store('user/' . Str::random(), 'public');
        }

        $user->update($data);

        return to_route('user.index')->with('success', "User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        $name = $user->name;
        $user->delete();
        if ($user->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($user->image_path));
        }
        return to_route('user.index')
            ->with('success', "User \"$name\" was successfully deleted");
    }

}
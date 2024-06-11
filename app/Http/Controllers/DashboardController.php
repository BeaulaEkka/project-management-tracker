<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth()->user();
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'pending')
            ->count();

        { /**completed */}
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $totalInProgressTasks = Task::query()
            ->where('status', 'in_Progress')
            ->count();

        $myInProgressTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'in_Progress')
            ->count();

        $myCreatedTasks = Task::query()
            ->where('created_by', $user->id)
            ->count();

        $pieData = [
            ['id' => 'pending', 'label' => 'Pending', 'value' => $totalPendingTasks, 'color' => '#fb7185'],
            ['id' => 'in_Progress', 'label' => 'In Progress', 'value' => $totalInProgressTasks, 'color' => '#22d3ee'],
            ['id' => 'completed', 'label' => 'Completed', 'value' => $totalCompletedTasks, 'color' => '#14b8a6'],
        ];

        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_Progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)->get();

        $activeTasks = TaskResource::collection($activeTasks);
        $activeTaskCount = $activeTasks->count();

        // // Get the top 5 performers for the current month
        // $topPerformers = DB::table('tasks')
        //     ->select('assigned_user_id', DB::raw('count(*) as total_completed_tasks'))
        //     ->where('status', 'completed')
        //     ->whereMonth('updated_at', Carbon::now()->month)
        //     ->whereYear('updated_at', Carbon::now()->year)
        //     ->groupBy('assigned_user_id')
        //     ->orderByDesc('total_completed_tasks')
        //     ->limit(5)
        //     ->get();

        // // Include user details for the top performers
        // $topPerformers = $topPerformers->map(function ($performer) {
        //     $user = User::find($performer->assigned_user_id);
        //     return [
        //         'user_id' => $performer->assigned_user_id,
        //         'user_name' => $user->name,
        //         'image_url' => $user->image_path,
        //         'total_completed_tasks' => $performer->total_completed_tasks,
        //     ];
        // });

        $topPerformers = Task::select('assigned_user_id', DB::raw('count(*) as total_completed_tasks'))
            ->where('status', 'completed')
            ->whereMonth('updated_at', now()->month)
            ->groupBy('assigned_user_id')
            ->orderByDesc('total_completed_tasks')
            ->take(3)
            ->get();

        // Eager load users
        $userIds = $topPerformers->pluck('assigned_user_id');
        $users = User::whereIn('id', $userIds)->get()->keyBy('id');

        $topPerformers = $topPerformers->map(function ($performer) use ($users) {
            $user = $users->get($performer->assigned_user_id);

            $imageUrl = ''; // Initialize with an empty string

            // Determine image URL based on storage location:

            // If image_path is a URL:
            if (filter_var($user->image_path, FILTER_VALIDATE_URL)) {
                $imageUrl = $user->image_path;
            } else {
                // If image_path is a path relative to public folder:
                $imageUrl = asset('storage/' . $user->image_path); // Assuming 'storage' is your disk name
            }

            return [
                'user_id' => $performer->assigned_user_id,
                'user_name' => $user->name,
                'image_url' => $imageUrl, // Use the constructed image URL
                'total_completed_tasks' => $performer->total_completed_tasks,
            ];
        });

        return inertia('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'myPendingTasks' => $myPendingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'myCompletedTasks' => $myCompletedTasks,
            'totalInProgressTasks' => $totalInProgressTasks,
            'myInProgressTasks' => $myInProgressTasks,
            'myCreatedTasks' => $myCreatedTasks,
            'activeTasks' => $activeTasks,
            'activeTaskCount' => $activeTaskCount,
            'pieData' => $pieData,
            'topPerformers' => $topPerformers,
            'auth' => [
                'user' => $user,
                'image_url' => $user->image_url,
                'position' => $user->position,
            ],

        ]);
    }
}

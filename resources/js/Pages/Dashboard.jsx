import MyActiveTasks from "@/Components/MyActiveTasks";
import PieChartComponent from "@/Components/PieChartComponent";
import { TopPerformers } from "@/Components/TopPerformers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MyProgressTasks from "@/Components/MyProgressTasks";

export default function Dashboard({
  auth,
  myPendingTasks,
  myCompletedTasks,
  myInProgressTasks,
  pieData,
  myCreatedTasks,
  activeTasks,
  activeTaskCount,
  topPerformers,
  dashboardImageUrl,
}) {
  const dateToday = new Date().toLocaleDateString("en-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="">
          <div className="flex items-center justify-between ">
            <h2 className="font-semibold text-xl text-gray-700 dark:text-gray-200 leading-tight">
              Dashboard
            </h2>
            <div className=" text-gray-700 dark:text-gray-200">{dateToday}</div>
          </div>
        </div>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="grid grid-cols-8 gap-4 max-w-7xl lg:px-8 px-2 mx-auto  relative ">
          {/**welcome */}
          <div className=" bg-emerald-400 dark:bg-gray-800  h-32  rounded-md col-span-8 flex  shadow-inner ">
            <div className="p-4 flex items-center self-center ">
              <div className="place-self-center  ring-2 ring-offset-2 ring-white rounded-sm ">
                <img
                  src={auth.image_url}
                  alt={auth.user}
                  height={192}
                  width={92}
                  className="rounded-sm object-cover shadow-sm"
                />
              </div>

              <div className="p-4 flex flex-col items-start justify-center h-full text-white dark:text-gray-400 capitalize">
                <p className="lg:text-lg text-md  ">Hello!</p>{" "}
                <p className="md:text-5xl text-xl font-bold  ">
                  {auth.user.name}!
                </p>
                <p className="">
                  You have {myInProgressTasks + myPendingTasks} tasks to do
                  today!
                </p>
              </div>
            </div>

            <img
              src={dashboardImageUrl}
              alt="dashboard"
              width="250"
              height="auto"
              className="absolute right-[-35px] top-[-30px] hidden md:block  "
            />
          </div>

          {/**pieChart */}
          <div className="col-span-8 lg:col-span-4 h-full">
            <div className="bg-white dark:bg-gray-800   overflow-hidden shadow-sm sm:rounded-lg lg:col-span-2 lg:h-[367px] rounded-md">
              <PieChartComponent data={pieData} />
            </div>
          </div>

          {/**tasks numbers blocks  */}
          <div className="lg:col-span-2  col-span-8">
            <MyProgressTasks
              myCompletedTasks={myCompletedTasks}
              myInProgressTasks={myInProgressTasks}
              myPendingTasks={myPendingTasks}
              myCreatedTasks={myCreatedTasks}
            />
          </div>
          {/**top performers */}
          <div className="lg:col-span-2  col-span-8 lg:h-[350px]">
            <div className="bg-white dark:bg-gray-800   overflow-hidden shadow-sm sm:rounded-lg rounded-md  ">
              <TopPerformers topPerformers={topPerformers} />
            </div>
          </div>
          {/**myacticetasks */}
          <div className=" h-full rounded-md col-span-8">
            <MyActiveTasks
              activeTasks={activeTasks}
              activeTaskCount={activeTaskCount}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

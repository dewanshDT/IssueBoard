import clsx from "clsx"
import { LuCircleDot } from "react-icons/lu"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"

const SideBar = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()

  return (
    <div className="w-52 border-r border-neutral-800 h-full py-2 px-3 hidden lg:flex flex-col gap-4">
      {/* Issues Section */}
      <div className="">
        <Link to="/issues/all">
          <div
            className={clsx(
              "text-medium text-sm py-1 px-2.5 rounded-md hover:bg-neutral-800 flex gap-1.5 items-center",
              /^\/issues\/all/.test(location.pathname) && "bg-neutral-800"
            )}
          >
            <LuCircleDot />
            <span>Issues</span>
          </div>
        </Link>
        {/* Issues Submenu */}
        <div className="pl-4 py-1">
          <div className="flex flex-col gap-1 border-l-2 border-neutral-700 pl-2">
            <Link to="/issues/active">
              <div
                className={clsx(
                  "text-medium text-sm text-neutral-400 py-0.5 px-2 rounded-md hover:bg-neutral-800",
                  /^\/issues\/active/.test(location.pathname) &&
                    "bg-neutral-800 text-neutral-100"
                )}
              >
                Active
              </div>
            </Link>
            <Link to="/issues/backlog">
              <div
                className={clsx(
                  "text-medium text-sm text-neutral-400 py-0.5 px-2 rounded-md hover:bg-neutral-800",
                  /^\/issues\/backlog/.test(location.pathname) &&
                    "bg-neutral-800 text-neutral-100"
                )}
              >
                Backlog
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Group By Section */}
      <div className="">
        <div className="text-medium text-sm py-1 px-2.5">Group by</div>
        {/* Group By Submenu */}
        <div className="pl-4 py-1">
          <div className="flex flex-col gap-1 border-l-2 border-neutral-700 pl-2">
            {/* Mapping through grouping options */}
            {["assignee", "label", "priority", "status"].map((item, index) => (
              <button
                key={index + item}
                className={clsx(
                  "text-sm text-left text-neutral-400 capitalize border border-transparent px-2 py-0.5 rounded-md",
                  searchParams.get("grouping") === item &&
                    "bg-neutral-800 text-neutral-100 border-neutral-600",
                  params.status === "backlog" && item === "status" && "hidden"
                )}
                onClick={() => {
                  setSearchParams({ grouping: item })
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar

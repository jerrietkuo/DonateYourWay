import { useQuery } from "@apollo/client";
import { ALL_CHARITIES } from "../utils/queries";

const CardNoCTA = () => {
  const { data } = useQuery(ALL_CHARITIES);
  const charities = data?.charities || [];

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {charities.slice(0, 3).map((charity) => {
        const { _id, imgLink, name, categories, mission } = charity;
        
        return (
          <div type="card" data-modal-toggle="defaultModal" key={_id}>
            {/* Card */}
            <div className="m-5 max-w-xs bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              {/* Image */}
              <img
                style={{ height: "200px" }}
                className="w-full rounded-t-lg object-cover"
                src={imgLink}
                alt={`${name} Charity`}
              />
              {/* Text */}
              <div className="p-5">
                <span className="mb-1 bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800">
                  {categories[0]?.name || "Uncategorized"}
                </span>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
                <p className="mission font-normal text-gray-700 dark:text-gray-400 text-base">
                  {mission?.substring(0, 128) || "No mission available"}...
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardNoCTA;
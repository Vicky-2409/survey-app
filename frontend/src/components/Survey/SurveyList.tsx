import React, { useState, useEffect } from "react";
import { Survey } from "../../types/survey.types";
import { SurveyService } from "../../services/survey.service";
import { Messages } from "../../constants/messages.constant";

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await SurveyService.getSurveys();
        if (response.data) {
          setSurveys(response.data);
        } else {
          setError(response.message || "Failed to fetch surveys");
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (survey.message &&
        survey.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSurveyDetails = (id: string | undefined) => {
    if (selectedSurvey === id) {
      setSelectedSurvey(null);
    } else {
      setSelectedSurvey(id || null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">{Messages.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 max-w-lg mx-auto">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (surveys.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">{Messages.NO_SURVEYS}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Survey Submissions
        </h2>

        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search surveys..."
            className="w-full sm:w-64 pl-3 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gender
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nationality
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Date Submitted
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSurveys.map((survey) => (
              <React.Fragment key={survey._id}>
                <tr
                  className={`hover:bg-gray-50 ${
                    selectedSurvey === survey._id ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {survey.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {survey.gender.charAt(0).toUpperCase() +
                        survey.gender.slice(1).replace("_", " ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {survey.nationality}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`mailto:${survey.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {survey.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <a
                      href={`tel:${survey.phoneNumber}`}
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      {survey.phoneNumber}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-500">
                      {survey.createdAt
                        ? new Date(survey.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleSurveyDetails(survey._id)}
                      className="text-blue-600 hover:text-blue-900 focus:outline-none"
                    >
                      {selectedSurvey === survey._id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>
                {selectedSurvey === survey._id && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 bg-gray-50 border-b border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Address:
                          </h4>
                          <p className="text-sm text-gray-900 mt-1">
                            {survey.address || "N/A"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Submitted on:
                          </h4>
                          <p className="text-sm text-gray-900 mt-1">
                            {survey.createdAt
                              ? new Date(survey.createdAt).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Message:
                        </h4>
                        <div className="mt-2 p-3 bg-white border border-gray-200 rounded text-sm text-gray-800 whitespace-pre-line">
                          {survey.message || "No message provided"}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredSurveys.length} of {surveys.length} surveys
      </div>
    </div>
  );
};

export default SurveyList;

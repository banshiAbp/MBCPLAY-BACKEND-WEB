import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMaturityRatingList } from "../../../services/media-management/maturity-ratings/getMaturityRatingList";
import { MaturityRating } from "../../../interfaces/media-management/maturity-rating/maturityRatingType";
import { transformMaturityRatingList } from "../../../interfaces/media-management/maturity-rating/maturityRatingTransform";
import HeaderToolbar from "../../../components/HeaderToolbar";
import Breadcrumb from "../../../components/Breadcrumb";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import ToggleSwitch from "../../../components/ToggleSwitch";
import DetailsPopup from "../../../components/DetailsPopup";
import "../../../styles/media-management/maturity-ratings.scss";

const MaturityRatings: React.FC = () => {
  const [maturityRatings, setMaturityRatings] = useState<MaturityRating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [descModal, setDescModal] = useState<{ open: boolean; text: string }>({
    open: false,
    text: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaturityRatings(currentPage);
  }, [currentPage]);

  const fetchMaturityRatings = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getMaturityRatingList({
        page,
      });
      setMaturityRatings(transformMaturityRatingList(data.data.maturity_ratings || []));
      setTotalPages(data.data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch maturity ratings.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (id: string) => {
    setMaturityRatings((prev) =>
      prev.map((rating) => (rating.id === id ? { ...rating, status: !rating.status } : rating))
    );
    // TODO: Implement status update API call
  };

  return (
    <div className="maturity-ratings-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Maturity Ratings" },
        ]}
      />
      <h2 className="maturity-ratings-title">Maturity Ratings</h2>
      <HeaderToolbar
        showSearchBox={true}
        showAddNewButton={true}
        showSearchTypeDropdown={true}
        searchPlaceholder="Search Maturity Rating..."
        addNewLabel="New"
        onSearch={() => {}}
        onAddNew={() => navigate("/media-management/maturity-ratings/manage")}
      />
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      {loading ? (
        <Loader visible={true} />
      ) : (
        <div className="maturity-ratings-table-wrapper">
          <table className="maturity-ratings-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {maturityRatings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-data">
                    No maturity ratings found.
                  </td>
                </tr>
              ) : (
                maturityRatings.map((rating) => {
                  const desc = rating.description || "";
                  return (
                    <tr key={rating.id}>
                      <td>{rating.title}</td>
                      <td>
                        {desc.length > 20 ? (
                          <>
                            {desc.slice(0, 20)}
                            <span
                              className="maturity-ratings-table-description-more"
                              onClick={() =>
                                setDescModal({ open: true, text: desc })
                              }
                            >
                              ...
                            </span>
                          </>
                        ) : (
                          desc
                        )}
                      </td>
                      <td>{rating.code}</td>
                      <td>
                        <ToggleSwitch
                          checked={rating.status}
                          onChange={() => handleStatusToggle(rating.id)}
                        />
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/media-management/maturity-ratings/manage/${rating.id}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <DetailsPopup
            open={descModal.open}
            title="Description"
            details={descModal.text}
            onClose={() => setDescModal({ open: false, text: "" })}
          />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default MaturityRatings;

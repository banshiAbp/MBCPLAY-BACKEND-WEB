import React, { useEffect, useState } from "react";
import { getAdvertisementList } from "../../../services/media-management/advertisements/getAdvertisementList";
import { Advertisement } from "../../../interfaces/media-management/advertisement/advertisementType";
import { useNavigate } from "react-router-dom";
import HeaderToolbar from "../../../components/HeaderToolbar";
import { transformAdvertisementList } from "../../../interfaces/media-management/advertisement/advertisementTransform";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/advertisements.scss";

const Advertisements: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Define table columns
  const columns: TableColumn[] = [
    { key: "advertisementTitle", label: "Title" },
    { key: "advertisementDescription", label: "Description" },
    { 
      key: "advertisementUrl", 
      label: "URL",
      render: (value: string) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="advertisement-url-link"
          title={value}
          data-tooltip={value}
        >
          Link
        </a>
      )
    },
    { key: "advertisementStatus", label: "Status" },
    { key: "action", label: "Action" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAdvertisements(token, currentPage);
    }
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchAdvertisements = async (token: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAdvertisementList({
        page,
        token,
      });
      setAdvertisements(transformAdvertisementList(data.advertisements || []));
      setTotalPages(Math.ceil(data.total / 20)); // Assuming page size is 20
    } catch (err: any) {
      setError(err.message || "Failed to fetch advertisements.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (id: string) => {
    setAdvertisements((prev) =>
      prev.map((ad) => (ad.advertisementId === id ? { ...ad, advertisementStatus: !ad.advertisementStatus } : ad))
    );
    // TODO: Implement status update API call
  };

  const handleEdit = (id: string) => {
    navigate(`/media-management/advertisements/manage-advertisements/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="advertisements-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Advertisements" },
        ]}
      />
      <h2 className="advertisements-title">Advertisements</h2>
      <HeaderToolbar
        showSearchBox={true}
        showAddNewButton={true}
        showSearchTypeDropdown={true}
        searchPlaceholder="Search Advertisement..."
        addNewLabel="New"
        onSearch={() => {}}
        onAddNew={() => navigate("/media-management/advertisements/manage-advertisements")}
      />
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      <CommonTable
        columns={columns}
        data={advertisements}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onStatusToggle={handleStatusToggle}
        onEdit={handleEdit}
        noDataMessage="No advertisements found."
        className="advertisements-table-wrapper"
      />
    </div>
  );
};

export default Advertisements;

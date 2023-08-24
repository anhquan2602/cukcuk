const Resource = {
    VN: {
        Common: {
            Save: "Cất",
            SaveAdd: "Cất & thêm",
            Help: "Giúp",
            Edit: "Sửa",
            Copy: "Nhân bản",
            Refresh: "Nạp",
            Delete: "Xóa",
            Create: "Thêm",
            Loading: "Đang lấy dữ liệu...",
            Close: "Đóng",
            Destroy: "Hủy bỏ",
            No: "Không",
            Yes: "Có",
            Agree: "Đồng ý",
            SaveClose: "Dữ liệu đã thay đổi, bạn có muốn cất không?",
            TitleReport: "CUKCUK - Quản lý nhà hàng",
        },
        FilterRule: [
            { value: 1, Code: "*", Name: "Chứa" },
            { value: 2, Code: "=", Name: "Bằng" },
            { value: 3, Code: "+", Name: "Bắt đầu bằng" },
            { value: 4, Code: "-", Name: "Kết thúc bằng" },
            { value: 5, Code: "!", Name: "Không chứa" },
        ],
        FilterRuleCompare: [
            { value: 1, Code: "=", Name: "Bằng" },
            { value: 2, Code: "<", Name: "Nhỏ hơn" },
            { value: 3, Code: ">", Name: "Lớn hơn" },
            { value: 4, Code: "<=", Name: "Nhỏ hơn hoặc bằng" },
            { value: 5, Code: ">=", Name: "Lớn hơn hoặc bằng" },
        ],
    },
};
export default Resource;
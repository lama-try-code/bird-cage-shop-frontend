import React, { useEffect, useState } from "react";
import "./ComboBox.css";
import api from "../utils/requestAPI";

const ComboBox = ({ classname, onChange, defaultValue }) => {
  const [selected, setSelected] = useState("");
  const [listSize, setListSize] = useState(null);
  const [listMaterial, setListMaterial] = useState(null);
  const [listColor, setListColor] = useState(null);
  const [listStyle, setListStyle] = useState(null);
  const [defaultParam, setDefault] = useState("");
  const priceOptions = ["Tăng dần", "Giảm dần"];

  const questionOptions = [
    "Câu hỏi 1",
    "Câu hỏi 2",
    "Câu hỏi 3",
    "Câu hỏi 4",
    "Câu hỏi 5",
  ];

  const blogTypeOptions = [
    "Hướng dẫn chăm sóc ",
    "Tư vấn mua lồng",
    "Bài viết về chim",
  ];

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    if (defaultValue !== "") {
      setDefault(defaultValue);
      console.log(defaultValue);
    }
  }, [defaultValue]);

  if (classname === "style") {
    const fetchDataStyle = async () => {
      const urlStyle = "/api/Style/get-all";
      try {
        const responseStyle = await api.get(urlStyle);
        console.log(responseStyle.data);
        setListStyle(responseStyle.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchDataStyle();
    }, []);

    return (
      <div className="combo-box-product">
        <select value={selected} onChange={handleChangeSelect}>
          {defaultParam ? (
            <option value={defaultParam} hidden>
              {defaultParam}
            </option>
          ) : (
            <option value="" hidden>
              Chọn kiểu lồng
            </option>
          )}
          {listStyle?.map((style) => (
            <option key={style?.sizeId} value={style?.sizeId}>
              {style?.styleName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (classname === "size") {
    const fetchDataSize = async () => {
      const url = "/api/Size/get";
      try {
        const response = await api.get(url);
        console.log(response.data);
        setListSize(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchDataSize();
    }, []);

    return (
      <div className="combo-box-product">
        <select value={selected} onChange={handleChangeSelect}>
          {defaultParam ? (
            <option value={defaultParam} hidden>
              {defaultParam}
            </option>
          ) : (
            <option value="" hidden>
              Chọn kích thước lồng
            </option>
          )}
          {listSize?.map((size) => (
            <option key={size?.sizeId} value={size?.sizeId}>
              {size?.size1}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (classname === "material") {
    const fetchDataMaterial = async () => {
      const url = "/api/Material/get-all";
      try {
        const response = await api.get(url);
        console.log(response.data);
        setListMaterial(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchDataMaterial();
    }, []);

    return (
      <div className="combo-box-product">
        <select value={selected} onChange={handleChangeSelect}>
          {defaultParam ? (
            <option value={defaultParam} hidden>
              {defaultParam}
            </option>
          ) : (
            <option value="" hidden>
              Chọn chất liệu lồng
            </option>
          )}
          {listMaterial?.map((material) => (
            <option key={material.materialId} value={material.materialId}>
              {material.materialName}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (classname === "color") {
    const fetchDataColor = async () => {
      const url = "/api/Color/get-all";
      try {
        const response = await api.get(url);
        console.log(response.data);
        setListColor(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchDataColor();
    }, []);

    return (
      <div className="combo-box-product">
        <select value={selected} onChange={handleChangeSelect}>
          {defaultParam ? (
            <option value={defaultParam} hidden>
              {defaultParam}
            </option>
          ) : (
            <option value="" hidden>
              Chọn màu lồng
            </option>
          )}
          {listColor?.map((color) => (
            <option key={color.colorId} value={color.colorId}>
              {color.colorName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (classname === 'product') {
    return (
      <div className="combo-box-price">
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="" disabled hidden selected>Sắp xếp theo giá</option>
          {priceOptions.map(priceOption => (
            <option key={priceOption} value={priceOption}>
              {priceOption}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (classname === 'question') {
    return (
      <div className="combo-box-question">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="" disabled hidden>
            Chọn câu hỏi xác thực
          </option>
          {questionOptions.map((questionOption) => (
            <option key={questionOption} value={questionOption} className="combobox-option" style={{ padding: '5px' }}>
              {questionOption}
            </option>
          ))}
        </select>
      </div>
    )
  }

  else {
    return (
      //product
      // <div className="combo-box-price">
      //     <select value={selected} onChange={e => setSelected(e.target.value)}>
      //         <option value="" disabled hidden selected>Sắp xếp theo giá</option>
      //         {priceOptions.map(priceOption => (
      //             <option key={priceOption} value={priceOption}>
      //                 {priceOption}
      //             </option>
      //         ))}
      //     </select>
      // </div>

      // size
      // <div className="combo-box-product">
      //     <select value={selected} onChange={e => setSelected(e.target.value)}>
      //         <option value="" disabled hidden selected>Chọn kích thước lồng</option>
      //         {sizeOptions.map(sizeOption => (
      //             <option key={sizeOption} value={sizeOption}>
      //                 {sizeOption}
      //             </option>
      //         ))}
      //     </select>
      // </div>

      // material
      // <div className="combo-box-product">
      //     <select value={selected} onChange={e => setSelected(e.target.value)}>
      //         <option value="" disabled hidden selected>Chọn chất liệu lồng</option>
      //         {materialOptions.map(materialOption => (
      //             <option key={materialOption} value={materialOption}>
      //                 {materialOption}
      //             </option>
      //         ))}
      //     </select>
      // </div>

      //color
      //<div className="combo-box-product">
      //    <select value={selected} onChange={e => setSelected(e.target.value)}>
      //        <option value="" disabled hidden selected>Chọn màu lồng</option>
      //        {colorOptions.map(colorOption => (
      //            <option key={colorOption} value={colorOption}>
      //                {colorOption}
      //            </option>
      //        ))}
      //    </select>
      //</div>
      // <div className="combo-box-question">
      //   <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      //     <option value="" disabled hidden>
      //       Chọn câu hỏi xác thực
      //     </option>
      //     {questionOptions.map((questionOption) => (
      //       <option key={questionOption} value={questionOption} className="combobox-option" style={{padding: '5px'}}>
      //         {questionOption}
      //       </option>
      //     ))}
      //   </select>
      // </div>

      <div className="combo-box-question">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="" disabled hidden>
            Chọn loại bài viết
          </option>
          {blogTypeOptions.map((option) => (
            <option key={option} value={option} className="combobox-option" style={{ padding: '5px' }}>
              {option}
            </option>
          ))}
        </select>
      </div>

    );
  }
};

export default ComboBox;

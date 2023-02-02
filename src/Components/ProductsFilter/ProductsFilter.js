// import React,{useState} from 'react'

// const ProductsFilter = () => {
//   const [products, setProducts] = useState([]);
//     const [value, setValue] = useState([0, 1000]);
//   const [toggleBrands, setToggleBrands] = useState(false);
//   const [genderState, setGenderState] = useState([
//     { id: "0", text: "qız", checked: false },
//     { id: "1", text: "oğlan", checked: false },
//   ]);

//     const fetchFilteredData = async () => {
//         const url = filterUrl;
//         console.log(url);
//         setLoading(true);

//         try {
//           const response = await fetch(url);

//           const data = await response.json();

//           setProducts(data);
//           setLoading(false);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//     function valuetext(value) {
//         return `${value} manat`;
//       }

//       const genderSelectHandler = (e) => {
//         const currentId = e.target.id;
//         const secondId = currentId === "0" ? "1" : "0";

//         setGenderState((prev) => {
//           // if (!prev[currentId].checked && !prev[secondId].checked) {
//           //   return [{ ...prev[currentId], checked: true }, ...prev];
//           // }

//           if (
//             (!prev[currentId.checked] && !prev[secondId].checked) ||
//             (!prev[currentId.checked] && prev[secondId].checked)
//           ) {
//             return [
//               { ...prev[currentId], checked: true },
//               { ...prev[secondId], checked: false },
//             ];
//           }
//         });

//         dispatch({
//           type: "category",
//           payload: `category=${genderState[currentId].text}&`,
//         });
//       };

//       const tagNameChangeHandler = (e) => {
//         const inputValue = e.target.value;

//         dispatch({ type: "search", payload: `search=${inputValue}&` });
//       };

//       const ageSelectHandler = (e) => {
//         const { value, checked } = e.target;

//         if (checked) {
//           dispatch({ type: "age", payload: `age=${value}&`, checked });
//         } else {
//           dispatch({ type: "age", payload: `age=${value}&` });
//         }
//       };

//       const handleChange = (event, newValue) => {
//         setValue(newValue);

//         dispatch({ type: "price", payload: `price=[${newValue}]&` });
//       };

//   return (
//     <form className={styles.filterBoxWrapper}>
//               <div className={styles.filterBox}>
//                 <p className={styles.filterBox__header}>Cins</p>

//                 {genderState?.map((data) => (
//                   <label key={data.id}>
//                     {data.text}

//                     <input
//                       id={data.id}
//                       value={data.text}
//                       checked={data.checked}
//                       type={"checkbox"}
//                       onChange={genderSelectHandler}
//                     />

//                     <span className={styles.checkmark} />
//                   </label>
//                 ))}
//               </div>

//               <div className={styles.filterBox}>
//                 <p className={styles.filterBox__header}>
//                   Qiymətə görə filtrələyin
//                 </p>

//                 <Box className={styles.filterBox__priceSlider}>
//                   <Slider
//                     getAriaLabel={() => null}
//                     value={value}
//                     onChange={handleChange}
//                     getAriaValueText={valuetext}
//                     size="small"
//                     max={1000}
//                   />
//                 </Box>

//                 <div className={styles.filterBox__priceWrapper}>
//                   <p>
//                     {value[0]} <span>Azn</span>
//                   </p>
//                   <p>
//                     {value[1]} <span>Azn</span>
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.filterBox}>
//                 <div className={styles.filterBox__tagWrapper}>
//                   <input
//                     type="text"
//                     placeholder="məhsul növü"
//                     onChange={tagNameChangeHandler}
//                   />
//                 </div>
//               </div>

//               <div className={styles.filterBox}>
//                 <p className={styles.filterBox__header}>Yaş</p>

//                 {ageInputData.map((age) => (
//                   <label key={age.id}>
//                     {age.text} yaş
//                     <input
//                       defaultChecked={search.includes(age.text)}
//                       type={"checkbox"}
//                       value={age.text}
//                       onChange={ageSelectHandler}
//                     />
//                     <span className={styles.checkmark} />
//                   </label>
//                 ))}
//               </div>

//               <div className={styles.filterBox}>
//                 <p className={styles.filterBox__header}>Marka</p>

//                 <div className={styles.brandsWrapper}>
//                   <div
//                     className={styles.brands__header}
//                     onClick={() => setToggleBrands((prev) => !prev)}
//                   >
//                     <p>
//                       {state.brand === null
//                         ? "Marka seçin"
//                         : state.brand.slice(6, 7).toUpperCase() +
//                           state.brand.slice(7, state.brand.length - 1)}
//                     </p>

//                     <div className={styles.brands__header__icon}>
//                       <span>&#9660;</span>
//                     </div>
//                   </div>

//                   <div
//                     className={
//                       toggleBrands
//                         ? styles["brands--open"]
//                         : styles["brands--close"]
//                     }
//                   >
//                     {brandsData.map((b) => (
//                       <button
//                         type="button"
//                         key={b.id}
//                         value={b.text}
//                         onClick={() => {
//                           dispatch({
//                             type: "brand",
//                             payload: `brand=${b.urlEndpoint}&`,
//                           });
//                           setToggleBrands(false);
//                         }}
//                       >
//                         {b.text}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className={styles.submitButton}
//                 onClick={fetchFilteredData}
//               >
//                 Təsdiq
//               </button>

//               <div className={styles.search__categories}>
//                 <h3>Kateqoriyalar</h3>

//                 <div className={styles.search__categories__link}>
//                   {categoryInputData.map((data) => (
//                     <Link
//                       to={`/products?category=${data.urlEndpoint}`}
//                       key={data.id}
//                     >
//                       {data.text}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </form>
//   )
// }

// export default ProductsFilter

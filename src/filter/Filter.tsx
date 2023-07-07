import React, { RefObject, useContext, useEffect, useState } from 'react';
import Manufacturer from '../models/Manufacturer';
import Category from '../models/Category';
import Product from '../models/Product';
import Model from '../models/Model';
import DealDrop from './DealDrop';
import ManDrop from './ManDrop';
import ModelDrop from './ModelDrop';
import CatDrop from './CatDrop';
import "./styles/Filter.css"
import "./styles/test.css"
import { CategoryType } from '../models/CategoryType';
import StorageContext from '../stores/StorageContext';
import MainCat from './MainCat';
import FilterFoot from './FilterFoot';
import CentralContext from '../stores/CentralContext';
import { BargainType } from '../models/BargainType';
import { RentType } from '../models/RentType';
import Sort, { Prop } from './sort/Sort';


export interface DealType {
  sorter: string;
  value: string;
  type: string;
}

const Filter: React.FC<Prop> = (props: Prop) => {
  //Data
  const [manArray, setManArray] = useState<Manufacturer[]>([])
  const [modelsArray, setModelsArray] = useState<Model[]>([]);
  const [catArray, setCatArray] = useState<Category[]>([]);

  // FilterNums
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  //FilterOpts
  const [selectedDealTypes, setSelectedDealTypes] = useState<string[]>([]);
  const [selectedMans, setSelectedMans] = useState<Manufacturer[]>([]);
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);

  //Visuals
  const visCss = "active bg-white icon-orange border-orange";
  const [carVis, setCarVis] = useState<string>(visCss);
  const [specVis, setSpecVis] = useState<string>("");
  const [motoVis, setMotoVis] = useState<string>("");
  const [lastID, setLastID] = useState<number>(0);

  //ENG-GEO
  const dealGeo: string = "გარიგების ტიპი"
  const catGeo: string = "კატეგორია"
  const manGeo: string = "მწარმოებელი"
  const modelGeo: string = "მოდელი"

  //Context
  const storage = useContext(StorageContext)
  const controller = useContext(CentralContext)



  const options: DealType[] = [
    { sorter: "For Sale", value: "იყიდება", type: "ყიდვა" },
    { sorter: "For Rent", value: "ქირავდება", type: "ქირაობა" },
    { sorter: "Daily", value: "დღიურად", type: "enum" },
    { sorter: "With driver", value: "მძღოლით", type: "enum" },
    { sorter: "With redemption", value: "შესყიდვით", type: "enum" },
    { sorter: "Insured", value: "დაზღვეული", type: "enum" },
  ];


  // Filters
  const changeVehicle = (id: string) => {
    changeCats(Number(id));
    setCarVis(id === "0" ? visCss : "");
    setSpecVis(id === "1" ? visCss : "");
    setMotoVis(id === "2" ? visCss : "");
    setManArray(controller
      .getManufacturers(id === "0" ? CategoryType.Car : id === "1" ? CategoryType.Special : CategoryType.Motorbike)
      .sort((a, b) => (a.man_name > b.man_name) ? 1 : ((b.man_name > a.man_name) ? -1 : 0)));
  }


  const changeCats = (id: number) => {
    setLastID(id);
    setCatArray(controller.getCategories(id === 0 ? CategoryType.Car : id === 1 ? CategoryType.Special : CategoryType.Motorbike));
    setSelectedMans([]);
    setSelectedModels([]);
    setSelectedCats([]);
    updateModels([]);

    const spanMan = document.getElementById("2id") as HTMLInputElement;
    const spanMod = document.getElementById("3id") as HTMLInputElement;
    const spanCat = document.getElementById("4id") as HTMLInputElement;

    if (spanCat)
      spanCat.innerText = catGeo;
    if (spanMan)
      spanMan.innerText = manGeo;
    if (spanMod)
      spanMod.innerText = modelGeo;
  }

  const updateModels = (tmp: Manufacturer[]) => {
    controller.getModels(tmp.map((man) => Number(man.man_id)), storage)
  }

  const updateModelsVis = (id: string) => {
    let tmp = selectedModels.filter((mod) => mod.man_id != Number(id))
    setSelectedModels(tmp)

    const spanElement = document.getElementById("3id") as HTMLInputElement;;
    const treshHold = 320
    if (spanElement) {
      const { clientWidth } = spanElement;
      let arrayContent = '';
      if (tmp.length > 0)
        arrayContent = tmp[0].model_name;

      if (tmp.length === 0) {
        spanElement.innerText = modelGeo;
        return
      }

      tmp = tmp.slice(1)

      tmp.forEach((man) => arrayContent += ", " + man.model_name)

      if (clientWidth > treshHold) {
        let truncatedContent = '';
        let i = 0;
        while (i < tmp.length && spanElement.clientWidth <= treshHold) {
          truncatedContent += `${tmp[i].model_name}, `;
          spanElement.innerText = truncatedContent + '...';
          i++;
        }
      } else {
        spanElement.innerText = arrayContent;
      }
    }
  }

  useEffect(() => {
    setModelsArray(storage.models);
  }, [storage.models]);

  useEffect(() => {
    if (storage.loadGlobal) {
      storage.setCurrency(1)
      changeVehicle("0")
      changeCats(0)
    }
  }, [storage.loadGlobal]);

  const handleSubmit = () => {
    storage.setProducts([]);
    setTimeout(() => {storage.setCurrPage(1);}, 1000);

    const period = storage.period;
    const sort = storage.sort;
    const page = 1;

    let minValue: number | undefined = parseInt(minPrice, 10);
    let maxValue: number | undefined = parseInt(maxPrice, 10);


    setMinPrice(isNaN(minValue) ? '' : String(minValue))
    setMaxPrice(isNaN(maxValue) ? '' : String(maxValue))

    minValue = isNaN(minValue) ? undefined : minValue
    maxValue = isNaN(maxValue) ? undefined : maxValue

    let bargain = selectedDealTypes.length == 0 ?
      undefined :
      selectedDealTypes.includes("ქირავდება") ?
        BargainType.Rent : BargainType.Sale

    let rents: RentType[] | undefined = []

    selectedDealTypes.forEach((deal) => {
      if (deal == "დღიურად")
        rents?.push(RentType.Daily)
      if (deal == "მძღოლით")
        rents?.push(RentType.Driver)
      if (deal == "შესყიდვით")
        rents?.push(RentType.Purchase)
      if (deal == "დაზღვეული")
        rents?.push(RentType.Insured)
    })

    rents = rents.length > 0 ? rents : undefined

    controller.getProducts(storage, false, selectedMans.map((man) => Number(man.man_id)), selectedModels.map(m => m.model_id),
      selectedCats.map((cat) => Number(cat.category_id)), minValue, maxValue, storage.currency,
      period, bargain, rents, sort, page);

    props.handleSubmit();
  }

  const clear = () => {
    changeVehicle(String(lastID))
    setSelectedDealTypes([])
    const spanDeal = document.getElementById("1id") as HTMLInputElement;
    if (spanDeal != null)
      spanDeal.innerText = dealGeo;
    setMinPrice("")
    setMaxPrice("")
  }

  const handleManChange = (id: string, ref: RefObject<HTMLSpanElement>) => {
    let tmp = selectedMans;
    let man = manArray.find((man) => man.man_id == id)

    if (man != null) {
      const isIdIncluded = selectedMans.some((man) => man.man_id === id);

      if (isIdIncluded) {
        tmp = selectedMans.filter((man) => man.man_id !== id);
      } else {
        tmp = [...selectedMans, man];
      }

      setSelectedMans(tmp)
    }

    if (tmp.length < selectedMans.length) {
      updateModelsVis(id);
    }

    updateModels(tmp)

    const spanElement = document.getElementById("2id") as HTMLInputElement;;
    const treshHold = 320
    if (spanElement) {
      const { clientWidth } = spanElement;
      let arrayContent = '';
      if (tmp.length > 0)
        arrayContent = tmp[0].man_name;

      if (tmp.length === 0) {
        spanElement.innerText = manGeo;
        return
      }

      tmp = tmp.slice(1)

      tmp.forEach((man) => arrayContent += ", " + man.man_name)

      if (clientWidth > treshHold) {
        let truncatedContent = '';
        let i = 0;
        while (i < tmp.length && spanElement.clientWidth <= treshHold) {
          truncatedContent += `${tmp[i].man_name}, `;
          spanElement.innerText = truncatedContent + '...';
          i++;
        }
      } else {
        spanElement.innerText = arrayContent;
      }
    }
  };

  return (
    <>
      <div className="w-md-250px bg-white border-solid-1 border-gray-350 border-radius-md-8" >
        <MainCat
          changeVehicle={changeVehicle}
          carVis={carVis}
          specVis={specVis}
          motoVis={motoVis}
        />
        <div className="px-24px pb-24px border-bottom border-solid-1 border-gray-200">
          <DealDrop
            setSelectedTypes={setSelectedDealTypes}
            selectedTypes={selectedDealTypes}
            placeholder={dealGeo}
            options={options}
            type={1}
          />
          <ManDrop
            handleOptionChange={handleManChange}
            setSelectedTypes={setSelectedMans}
            update={updateModels}
            selectedTypes={selectedMans}
            placeholder={manGeo}
            options={manArray}
            type={2}
          />

          <ModelDrop
            handleOptionChange={handleManChange}
            setSelectedTypes={setSelectedModels}
            selectedTypes={selectedModels}
            placeholder={modelGeo}
            options={modelsArray}
            type={3}
            selectedMan={selectedMans}
          />

          <CatDrop
            setSelectedTypes={setSelectedCats}
            selectedTypes={selectedCats}
            placeholder={catGeo}
            options={catArray}
            type={4}
          />
        </div>
        <FilterFoot
          storage={storage}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleSubmit={handleSubmit}
          clear={clear}
        />
      </div>
    </>
  );
}

export default Filter;
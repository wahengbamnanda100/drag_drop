import React, { useState } from "react";
import _ from "lodash";

import jsonData from "../../../utils/treeData.json";
import newJosnData from "../../../utils/newTreeData.json";

function coverttoNestedObject(inputObject, type) {
  let resChildren = [];
  let level = 0;
  const firstLevelKey = Object.keys(inputObject);
  let secondLevelKey = Object.keys(inputObject[firstLevelKey[0]]);

  let firstChildren = secondLevelKey.map((key, index) => {
    const subKey = Object.keys(inputObject[firstLevelKey[0]][key]); //[put]
    let thirdLevelKey = Object.keys(
      inputObject[firstLevelKey[0]][key][subKey[0]]
    ); // [summary, parameters, response]
    let secondChildren = thirdLevelKey.map((innerKey, index) => {
      let result = [];
      if (innerKey === "responses") {
        let responseChildrenKeys = Object.keys(
          inputObject[firstLevelKey[0]][key][subKey[0]][innerKey]
        ); // [200, 400, 401]
        let responseChlidren = responseChildrenKeys.map(
          (innerMostKeys, index) => {
            return {
              key: innerMostKeys,
              id: `${innerMostKeys}__${type}-level3__${index}__${Date.now()}-${Math.floor(
                Math.random() * 100000
              )}`,
              //   type: `level-3__response__${innerMostKeys}`,
              //   type: `level-4`,
              title: innerMostKeys,
              level_id: `${innerMostKeys}-${level + 3}`,
              subTitle:
                inputObject[firstLevelKey[0]][key][subKey[0]][innerKey][
                  innerMostKeys
                ],
              resType: "string",
            };
          }
        );

        let res = {
          key: innerKey,
          id: `${innerKey}__${type}-level2__${index}__${Date.now()}-${Math.floor(
            Math.random() * 100000
          )}`,
          //   type: `level-2__${innerKey}`,
          type: `level-3-res`,
          title: innerKey,
          level_id: `${innerKey}-${level + 2}`,
          subTitle: "",
          children: [...responseChlidren],
        };
        result.push(res);
      } else if (innerKey === "parameters") {
        let paramsChildren =
          inputObject[firstLevelKey[0]][key][subKey[0]][innerKey];

        let resParmasChildren = paramsChildren.map((paramKey, index) => {
          return {
            key: paramKey,
            // id: `${paramKey["$ref"]}-${Date.now()}`,
            id: `${
              paramKey["$ref"]
            }__${type}-level3__${index}__${Date.now()}-${Math.floor(
              Math.random() * 100000
            )}`,
            // type: `level-3__parameter__${paramKey["$ref"]}`,
            // type: `level-4`,
            title: paramKey["$ref"],
            level_id: `${paramKey["$ref"]}-${level + 3}`,
            subTitle: "",
            resType: "string",
          };
        });

        let params = {
          //   id: `${innerKey}-${Date.now()}`,
          key: innerKey,
          id: `${innerKey}__${type}-level2__${index}__${Date.now()}-${Math.floor(
            Math.random() * 100000
          )}`,
          //   type: `level-2__${innerKey}`,
          type: `level-3-param`,
          title: innerKey,
          level_id: `${innerKey}-${level + 2}`,
          subTitle: "",
          children: [...resParmasChildren],
        };
        result.push(params);
      } else {
        return null;
      }
      return result;
    });

    const filteredSecondChildren = secondChildren.filter(
      (item) => item !== null
    );
    // console.log("🚀🚀", filteredSecondChildren.flat());
    const resultSecondChildren = filteredSecondChildren.flat();
    return {
      key: key,
      id: `${key}__${type}-level1__${index}__${Date.now()}-${Math.floor(
        Math.random() * 100000
      )}`,
      //   type: `level-1__${key}`,
      type: `level-2`,
      title: key,
      level_id: `${key}-${level + 1}`,
      subTitle: inputObject[firstLevelKey[0]][key][subKey[0]],
      children: [...resultSecondChildren],
    };
  });

  let result = {
    id: `${firstLevelKey[0]}__${type}-level0__${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}`, //add more random vlaue
    // type: firstLevelKey[0], //inputObject key 1st level
    type: "level-1", //inputObject key 1st level
    title: firstLevelKey[0], //inputObject key 1st level
    level_id: `${firstLevelKey[0]}-${level}`, //unique id
    subTitle: "lorem ipsum lorem ipsum",
    children: [...firstChildren],
  };

  return result;
}

const initialList = coverttoNestedObject(jsonData, 1);
const initialList2 = coverttoNestedObject(newJosnData, 2);

const MuiTreeDndApp = () => {
  const [state, setState] = useState([initialList, initialList2]);
  const [open, setOpen] = useState(false);
  const [copiedItems, setCopiedItems] = useState({
    destination: null,
    item: null,
    level: "",
  });
  const [overWriteData, setOverWriteData] = useState([]);

  return <div>testing</div>;
};

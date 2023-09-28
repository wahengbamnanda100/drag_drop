export const columns1 = [
  {
    key: "id",
    title: "ID",
    primaryKey: true,
    width: 30,
  },
  {
    key: "name",
    title: "Testing",
    render: (val, row, index) => {
      return <div>{val}</div>;
    },
  },
  {
    key: "desc",
    title: "SUbTitle",
  },
];

export const sourceData1 = {
  title: "source Data",
  fields: [
    {
      id: "1",
      name: "Gender",
      desc: "gender",
    },
    {
      id: "2",
      name: "Age",
      desc: "age",
    },
    {
      id: "3",
      name: "Hobby",
      desc: "hobby",
    },
    {
      id: "4",
      name: "Height",
      desc: "height",
    },
    {
      id: "5",
      name: "Weight",
      desc: "weight",
      checked: true,
    },
    {
      id: "6",
      name: "nation",
      desc: "nation",
      disable: true,
    },
  ],
};

export const targetData1 = {
  title: "Target Data",
  fields: [
    {
      id: "1",
      name: "Field 1",
      desc: "filed1",
    },
    {
      id: "2",
      name: "Field 2",
      desc: "filed2",
    },
    {
      id: "3",
      name: "Field 3",
      desc: "filed3",
    },
    {
      id: "4",
      name: "Field 4",
      desc: "filed4",
    },
    {
      id: "5",
      name: "Field 5",
      desc: "filed5",
    },
    {
      id: "6",
      name: "Field 6",
      desc: "filed6",
    },
    {
      id: "7",
      name: "Field 7",
      desc: "filed7",
    },
    {
      id: "8",
      name: "Field 8",
      desc: "filed8",
      disable: true,
    },
  ],
};

export const mappingData1 = [
  {
    source: "1",
    target: "3",
  },
  {
    source: "2",
    target: "4",
  },
  {
    source: "4",
    target: "1",
  },
];

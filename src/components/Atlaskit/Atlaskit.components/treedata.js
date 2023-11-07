export const treeWithTwoBranches1 = {
  rootId: "1",
  items: {
    1: {
      id: "1",
      children: ["1-1", "1-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "root",
      },
    },
    "1-1": {
      id: "1-1",
      children: ["1-1-1", "1-1-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: true,
      data: {
        title: "First parent",
      },
    },
    "1-2": {
      id: "1-2",
      children: ["1-2-1", "1-2-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Second parent",
      },
    },
    "1-1-1": {
      id: "1-1-1",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child one",
      },
    },
    "1-1-2": {
      id: "1-1-2",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child two",
      },
    },
    "1-2-1": {
      id: "1-2-1",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child three",
      },
    },
    "1-2-2": {
      id: "1-2-2",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child four",
      },
    },
  },
};

export const treeWithTwoBranches2 = {
  rootId: "11",
  items: {
    11: {
      id: "11",
      children: ["11-11", "11-22"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "root",
      },
    },
    "11-11": {
      id: "11-11",
      children: ["11-11-11", "11-11-22"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: true,
      data: {
        title: "First parent",
      },
    },
    "11-22": {
      id: "11-22",
      children: ["11-22-11", "11-22-22"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Second parent",
      },
    },
    "11-11-11": {
      id: "11-11-11",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child one",
      },
    },
    "11-11-22": {
      id: "11-11-22",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child two",
      },
    },
    "11-22-11": {
      id: "11-22-11",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child three",
      },
    },
    "11-22-22": {
      id: "11-22-22",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      isDragDisabled: false,
      data: {
        title: "Child four",
      },
    },
  },
};

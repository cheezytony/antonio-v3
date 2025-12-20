type StackItem = {
  icon?: any;
  description: Array<string>;
  logo?: any;
  name: string;
  parent: string;
  proficiency: number;
  slug: string;
  startedAt?: string;
  type: string;
  style: {
    color?: string;
    size: number;
    x: number;
    y: number;
  };
};

type StackCategory = {
  description: Array<string>;
  name: string;
  slug: string;
  tags: [];
  tools: Array<StackItem>;
};

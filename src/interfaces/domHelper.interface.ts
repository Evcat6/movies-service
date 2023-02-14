interface CreateElementArguments {
    tagName: string;
    className?: string;
    attributes?: Attributes;
}

type Attributes = { [key: string]: string };

export { CreateElementArguments };

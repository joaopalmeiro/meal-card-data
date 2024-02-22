interface Tag {
  name: string;
  accepts: boolean;
}

interface EdenredTag extends Tag {
  name: "Edenred";
}

export type Tags = [EdenredTag];

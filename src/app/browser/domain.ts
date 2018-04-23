export class File {
  type: string;

  pathId: string;
  parentId: string;

  realPath: string;
  name: string;

  // only when type = dir
  children: File[];

  playable: boolean;
}

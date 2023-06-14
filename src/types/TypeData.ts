import { TypeUser } from './TypeUser';
import { TypeDataPhoto } from './TypeDataPhoto';
import { TypePhotoAndComments } from './TypePhotoAndComments';
import { TypeDataStats } from './TypeDataStats';

export type TypeData =
  | TypeUser
  | TypeDataPhoto
  | TypePhotoAndComments
  | TypeDataPhoto[]
  | TypeDataStats[]
  | string
  | null;

export const isTypeDataStats = (data: TypeData): data is TypeDataStats[] => {
  if (data && data instanceof Array) {
    const [dataStats] = data;
    return (
      typeof dataStats === 'object' &&
      dataStats !== null &&
      'id' in dataStats &&
      'title' in dataStats &&
      'acessos' in dataStats
    );
  }

  return false;
};

export const isTypeUser = (data: TypeData): data is TypeUser => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'username' in data &&
    'nome' in data &&
    'email' in data
  );
};

export const isTypePhotoAndComments = (
  data: TypeData
): data is TypePhotoAndComments => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'photo' in data &&
    'comments' in data
  );
};

export const isTypeDataPhoto = (data: TypeData): data is TypeDataPhoto[] => {
  if (data && data instanceof Array) {
    const [dataPhoto] = data;

    return (
      typeof dataPhoto === 'object' &&
      dataPhoto !== null &&
      'id' in dataPhoto &&
      'acessos' in dataPhoto &&
      'author' in dataPhoto &&
      'date' in dataPhoto &&
      'idade' in dataPhoto &&
      'peso' in dataPhoto &&
      'src' in dataPhoto &&
      'title' in dataPhoto &&
      'total_comments' in dataPhoto
    );
  }

  return false;
};

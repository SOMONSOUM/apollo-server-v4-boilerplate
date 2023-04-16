export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Upload: any;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  createUserMutation?: Maybe<GqlOk>;
  multipleUpload?: Maybe<Array<Maybe<GqlUploadFileResponse>>>;
  singleUpload?: Maybe<GqlUploadFileResponse>;
  testingMuation?: Maybe<Scalars['Boolean']>;
};


export type GqlMutationCreateUserMutationArgs = {
  input: GqlUserInput;
};


export type GqlMutationMultipleUploadArgs = {
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};


export type GqlMutationSingleUploadArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};

export type GqlOk = {
  __typename?: 'Ok';
  ok?: Maybe<Scalars['Boolean']>;
};

export type GqlQuery = {
  __typename?: 'Query';
  hellWorld?: Maybe<Scalars['String']>;
};

export type GqlSubscription = {
  __typename?: 'Subscription';
  testingSub?: Maybe<Scalars['String']>;
};

export type GqlUploadFileResponse = {
  __typename?: 'UploadFileResponse';
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GqlUser = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type GqlUserInput = {
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

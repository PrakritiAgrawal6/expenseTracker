import { all } from "@redux-saga/core/effects";

import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}

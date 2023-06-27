import { toast } from 'react-toastify';
import { eventChannel } from 'redux-saga';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { YtSharedVideo } from 'types/entities.type';

import { ytSharedVideoActions } from './yt-shared-video.store';

let socket: Socket;

function setupSocketIo(token: string) {
  return io(`${process.env.REACT_APP_API_URL}/chats`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createSocketChannel() {
  return eventChannel(emit => {
    socket.on('connect', () => {
      console.log('socket connected', socket.connected);
    });
    socket.on('message', (msg: YtSharedVideo) => {
      emit({ type: 'message', data: msg });
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.disconnected);
    });
    const unsubscribe = () => {
      socket.off('message');
      socket.off('disconnect');
      socket.off('connect');
    };

    return unsubscribe;
  });
}

export function* initializeWebSocket() {
  try {
    const accessToken = yield select(state => state.app.accessToken);
    disconnectWebSocket();
    socket = setupSocketIo(accessToken);
    const socketChannel = yield call(createSocketChannel);
    while (true) {
      try {
        const { type, data } = yield take(socketChannel);
        switch (type) {
          case 'message':
            const currentUserId = yield select(state => state.app.profile.id);
            if (data?.user?.id !== currentUserId) {
              toast.info(`${data?.user?.email} shared video "${data?.title}"`);
            }
            yield put(ytSharedVideoActions.updateSharedYtVideo(data));
            break;
          default:
            break;
        }
      } catch (err) {}
    }
  } catch (err) {}
}

export function disconnectWebSocket() {
  if (socket) {
    socket.disconnect();
  }
}

export function* appSaga() {
  yield takeLatest('INITIALIZE_WEB_SOCKET', initializeWebSocket);
}

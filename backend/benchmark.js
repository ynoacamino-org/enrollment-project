import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 1000 },
    { duration: '120s', target: 20000 },
    { duration: '40s', target: 500 }
  ]
};

const SESSION_TOKEN = "-_OURbiHpF6Zj6cCQ2TX1DNrfi1gC-ph92j5FIW-GWA=";
const COOKIE = {
  cookies: {
    session_token: {
      value: SESSION_TOKEN,
      replace: true
    }
  }
};

export default function () {
  const base = 'http://10.7.127.198:8080';

  http.get(`${base}/auth/me`, COOKIE);
  sleep(0.7);

  http.get(`${base}/courses/enrollmented`, COOKIE);
  sleep(0.7);

  const institutionsRes = http.get(`${base}/institutions`, COOKIE);
  sleep(0.7);

  const institutionId = 1;

  const instDetailRes = http.get(`${base}/institutions/${institutionId}`, COOKIE);
  sleep(0.7);

  const processId = 29;

  const processRes = http.get(`${base}/processes/${processId}`, COOKIE);
  sleep(0.7);

  const courseId = 53;

  const sectionsRes = http.get(`${base}/courses/${courseId}/sections`, COOKIE);
  sleep(0.7);
}

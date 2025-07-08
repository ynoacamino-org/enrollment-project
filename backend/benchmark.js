import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 }
  ]
};

const SESSION_TOKEN = "TG63mZ6k3Jz0P-ToLb62YvGwFeHK4Z6HQZQRl1M2Hss=";
const COOKIE = {
  cookies: {
    session_token: {
      value: SESSION_TOKEN,
      replace: true
    }
  }
};

export default function () {
  const base = 'http://localhost:8080';

  // 1. GET /auth/me
  http.get(`${base}/auth/me`, COOKIE);
  sleep(0.5);

  // 2. GET /courses/enrollmented
  http.get(`${base}/courses/enrollmented`, COOKIE);
  sleep(0.5);

  // 3. GET /institutions
  const institutionsRes = http.get(`${base}/institutions`, COOKIE);

  const institutions = institutionsRes.json();
  sleep(0.5);
  if (!institutions || institutions.length === 0) return;

  const institutionId = institutions[0].id;

  const instDetailRes = http.get(`${base}/institutions/${institutionId}`, COOKIE);
  const institutionDetail = instDetailRes.json();
  sleep(0.5);
  if (!institutionDetail.processes || institutionDetail.processes.length === 0) return;

  const processId = institutionDetail.processes[0].id;

  // 5. GET /processes/{processId}
  const processRes = http.get(`${base}/processes/${processId}`, COOKIE);
  const processDetail = processRes.json();
  sleep(0.5);
  if (!processDetail.courses || processDetail.courses.length === 0) return;

  const courseId = processDetail.courses[0].id;

  // 6. GET /courses/{courseId}/sections
  const sectionsRes = http.get(`${base}/courses/${courseId}/sections`, COOKIE);
  const sections = sectionsRes.json();
  sleep(0.5);
}

# MAESTRO — Project Page

**M**acrocyclic-peptide **A**gent for **E**diting, **S**coring, **T**ool-utilizing **R**efinement & **O**ptimization

팀 뇌냠냠아메바 / Team 뇌냠냠아메바

빌드 과정이 없는 정적 페이지다. `index.html` 하나로 동작하며 한국어(KOR) / 영어(ENG) 토글을 지원한다.
A static page with no build step — `index.html` runs as-is, with a KOR / ENG language toggle.

---

## 구조 / Structure

```
.
├── index.html                 # 전체 페이지 (한국어·영어 콘텐츠 모두 포함)
├── .nojekyll                  # GitHub Pages가 static/ 을 그대로 서빙하도록
└── static/
    ├── css/style.css
    ├── js/main.js             # 언어 토글, 목차 하이라이트, 피겨 라이트박스
    └── images/
        ├── mascot.png               # 히어로 마스코트
        ├── favicon.svg
        ├── limitation-query.png     # Fig 1. 자연어 쿼리 대응 불가
        ├── limitation-rationale.png # Fig 2. rationale / 결정론적 툴 부재
        ├── pipeline.png             # Fig 3. 전체 파이프라인
        ├── example-molecule.png     # Fig 4. CHUCKLES 예시 분자
        ├── problem-aggregation.png  # Fig 5. 집계 의미론의 오류
        ├── problem-scale.png        # Fig 6. 스케일의 지배
        ├── planner.png              # Fig 7. Planner 구조
        ├── chart-tasks.png          # Fig 8. 리드 대비 변화량
        ├── case-trajectory.png      # Fig 9. 실제 편집 trajectory
        ├── table-pepinvent.png      # Table 1. PepINVENT 비교
        └── table-tasks.png          # Table 2. 5개 태스크 성능
```

## 섹션 / Sections

Motivation · Pipeline · Planning · Experiments · Case Study · Future

상단 목차는 스크롤 시 고정되며, 현재 보고 있는 섹션에 밑줄이 표시된다.

## GitHub Pages 배포 / Deploying

1. 이 폴더의 내용을 저장소 루트(또는 `docs/`)에 올린다.
2. **Settings → Pages → Build and deployment → Deploy from a branch** 에서 브랜치와 폴더를 선택한다.
3. 몇 분 뒤 `https://<user>.github.io/<repo>/` 에서 확인할 수 있다.

로컬 확인 / Local preview:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 언어 토글 / Language toggle

번역 가능한 모든 요소는 `data-l="ko"` 또는 `data-l="en"` 속성을 가진다.
CSS 한 줄이 비활성 언어를 숨기고, 선택은 `localStorage` 에 저장된다.

```html
<p data-l="ko">한국어 문단</p>
<p data-l="en">English paragraph</p>
```

문구를 추가할 때는 두 언어 블록을 나란히 두기만 하면 된다.

## 색상 / Palette

`static/css/style.css` 상단의 `:root` 변수에서 한 번에 조정할 수 있다.

| 용도 | 변수 | 값 |
| --- | --- | --- |
| Deep green | `--g-900` / `--g-700` | `#0b3f2a` / `#156b45` |
| Gold | `--gd-600` / `--gd-500` | `#b68c26` / `#c9a227` |
| Background | `--bg` | `#ffffff` |

피겨 배경이 모두 흰색이므로 페이지 배경도 흰색을 유지하고, 초록과 금색은 타이포그래피와 강조에만 사용한다.

## 링크 추가 / Adding links

현재 외부 링크(데모·PDF·저장소)는 없다. 나중에 추가하려면 `index.html` 의
`<p class="team">` 아래에 버튼을 넣고, `style.css` 에 다음을 추가하면 된다.

```css
.btn { display:inline-flex; align-items:center; gap:8px; padding:11px 22px;
  border-radius:999px; font-size:14.5px; font-weight:600; text-decoration:none;
  border:1px solid var(--line); color:var(--ink-2); background:#fff; }
.btn.primary { background:var(--g-700); border-color:var(--g-700); color:#fff; }
```

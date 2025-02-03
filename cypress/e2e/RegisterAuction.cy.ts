import { ROUTES } from '../../src/shared/constants/routes';

describe('경매 등록', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');

    cy.findByLabelText(/plus_icon/)
      .should('be.visible')
      .click();
    cy.url().should('include', ROUTES.REGISTER);
  });

  it('아무 것도 입력하지 않고 등록하기 버튼 클릭하면 빨간 경고문이 나타난다.', () => {
    cy.findByLabelText('바로 등록하기').click();

    cy.findByText(/사진은 최소 1장 이상 등록/).should('exist');
    cy.findByText(/제목은 공백을 제외하고 2자 이상 입력/).should('exist');
    cy.findByText(/카테고리를 선택해 주세요/).should('exist');
    cy.findByText(/최소 1000원 이상 입력/).should('exist');
  });

  it('이미지를 업로드할 수 있고, 삭제할 수 있다.', () => {
    cy.findByLabelText('사진 업로드 인풋').selectFile(
      [
        'cypress/fixtures/페이커.jpeg',
        'cypress/fixtures/김해1.jpg',
        'cypress/fixtures/김해2.jpg'
      ],
      { force: true }
    );

    cy.findByLabelText('현재 사진 숫자').contains(3);

    // x 버튼 클릭하면 이미지 삭제 가능
    cy.findByLabelText('사진 삭제_1').click();
    cy.findByLabelText('현재 사진 숫자').contains(2);
  });

  it('시작가 입력하고 포커스를 다른 곳으로 두면 원으로 포맷되고, 다시 입력하면 숫자로 포맷된다.', () => {
    const costInput = cy.findByLabelText(/시작 가격/);
    costInput.type('200000');

    costInput.blur();
    costInput.should('have.value', '200,000 원');

    costInput.focus();
    costInput.should('have.value', '200000');
  });

  it('이미지 업로드, 제목 입력, 카테고리 선택, 시작가 입력 => 바로 등록 클릭 => 주의 사항 페이지 => 주의사항 체크 => 최동 등록 클릭 => 홈 이동', () => {
    const imageInput = cy.findByLabelText('사진 업로드 인풋');
    const titleInput = cy.findByLabelText(/제목/);
    const selectTrigger = cy.findByRole('combobox', { name: /카테고리/ });
    const costInput = cy.findByLabelText(/시작 가격/);

    // 이미지 업로드
    imageInput.selectFile(
      [
        'cypress/fixtures/페이커.jpeg',
        'cypress/fixtures/김해1.jpg',
        'cypress/fixtures/김해2.jpg'
      ],
      { force: true }
    );

    // 제목 입력
    titleInput.type('페이커');

    // 시작가 입력
    selectTrigger.click();
    cy.findAllByRole('option', { name: /전자기기/ }).click();
    costInput.type('200000');

    // 등록
    cy.findByLabelText('바로 등록하기').click();

    // 주의사항
    cy.findByText('주의사항').should('be.visible');
    cy.findByLabelText('체크박스').click();

    // 최종 등록
    cy.findByLabelText('최종 등록 버튼').click();

    // 홈페이지 리다이렉트
    cy.verifyBaseUrl();
    cy.findByText('경매가 등록되었습니다.').should('be.visible');
  });
});

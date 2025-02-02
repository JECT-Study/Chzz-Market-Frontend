import { ROUTES } from '../../src/shared/constants/routes';

describe('로그인', () => {
  it('카카오 로그인 버튼 클릭하면 홈으로 이동한다.', () => {
    cy.visit(ROUTES.LOGIN);
    cy.url().should('include', ROUTES.LOGIN);

    cy.findByRole('button', { name: /카카오 로그인/ }).click();

    cy.wait(500);

    cy.verifyBaseUrl();

    cy.findByText('베스트 경매').should('be.visible');
    cy.findByText('종료 임박 경매').should('be.visible');
    cy.findByText('카테고리').should('be.visible');
    cy.findByText('사전 경매').scrollIntoView().should('be.visible');
  });
});

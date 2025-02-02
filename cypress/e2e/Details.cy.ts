describe('상세 조회', () => {
  beforeEach(() => {
    cy.login();
  });

  context('정식 경매', () => {
    context('내가 등록한 경매', () => {
      beforeEach(() => {
        cy.visit('/auctions/auction/1');
        cy.wait(1000);
      });

      it('내가 등록한 경매는 버튼 이름이 내가 등록한 경매이며, 클릭하지 못한다.', () => {
        cy.findByLabelText('내가 등록한 경매').should('be.disabled');
      });
    });

    context('내가 등록하지 않은 경매', () => {
      beforeEach(() => {
        cy.visit('/auctions/auction/0');
        cy.wait(1000);
      });

      it('경매 참여하기 클릭하면 입찰 페이지로 이동한다.', () => {
        cy.findByLabelText('경매 참여').click();

        cy.findByText('경매 참여하기').should('exist');
        cy.url().should('include', '/auctions/bid/0');
      });
    });
  });

  context('사전 경매', () => {
    context('내가 등록한 경매', () => {
      beforeEach(() => {
        cy.visit('/auctions/pre-auction/10');
        cy.wait(1000);
      });
      it('내가 등록한 사전 경매는 옵션이 있다.', () => {
        cy.findByLabelText('옵션').should('exist');
      });

      it('옵션을 클릭하면 모달이 나오고 수정하기와 삭제하기 버튼이 있다. 수정하기 버튼 클릭하면 수정 페이지로 간다.', () => {
        cy.findByLabelText('옵션').click();

        cy.findByLabelText('모달').should('exist');

        const editBtn = cy.findByLabelText('수정하기');
        editBtn.should('exist');
        const deleteBtn = cy.findByLabelText('삭제하기 확인');
        deleteBtn.should('exist');

        editBtn.click();
        cy.url().should('include', '/auctions/pre-auction/edit/10');
      });

      it('옵션을 클릭하면 모달이 나오고 수정하기와 삭제하기 버튼이 있다. 삭제하기 버튼 클릭하면, 확인 모달이 나오고 삭제하기 클릭하면, 삭제되고 홈으로 이동한다.', () => {
        cy.findByLabelText('옵션').click();

        cy.findByLabelText('모달').should('exist');

        cy.findByLabelText('삭제하기 확인').click();
        cy.findAllByLabelText('확인 모달').should('exist');

        cy.findByLabelText('삭제하기').click();
        cy.findByText('사전 경매가 삭제되었습니다.').should('exist');
        cy.verifyBaseUrl();
      });
      it('경매 전환하기 버튼을 클릭하면 확인 모달이 나오고 전환하기 버튼을 클릭하면 새로운 경매가 시작된다.', () => {
        cy.findByLabelText('경매 전환 확인').should('exist').click();
        cy.findByLabelText('확인 모달').should('exist');

        cy.findAllByLabelText('경매 전환').click();
        cy.findByText('경매로 전환되었습니다.').should('exist');
      });
    });
    context('내가 등록하지 않은 경매', () => {
      beforeEach(() => {
        cy.visit('/auctions/pre-auction/12');
        cy.wait(1000);
      });

      it('내가 등록하지 않은 사전 경매는 옵션이 없다.', () => {
        cy.findByLabelText('옵션').should('not.exist');
      });

      it('찜 목록에 추가 버튼 클릭하면 찜 목록에 추가되고, 찜 목록에서 제외 버튼으로 변경된다.', () => {
        cy.findByLabelText('찜 목록에 추가').click();
        cy.findByLabelText('찜 목록에서 제외');
      });
    });
  });
});

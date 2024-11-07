describe('Проверка контактной информации на сайте Byndyusoft', () => {
  it('Проверка ссылки на Telegram в всплывающем окне', () => {
    // Блокируем запросы к аналитике и рекламе
    cy.intercept('https://mc.yandex.ru/**', { forceNetworkError: true }).as('blockYandexRequest');
    cy.intercept('https://www.google-analytics.com/**', { forceNetworkError: true }).as('blockGoogleAnalytics');
    cy.intercept('https://analytics.google.com/**', { forceNetworkError: true }).as('blockGoogleAnalytics2');
    cy.intercept('https://googleads.g.doubleclick.net/**', { forceNetworkError: true }).as('blockDoubleClick');

    // Переход на Google
    cy.visit('https://www.google.ru/', { timeout: 60000 });

    // Поиск Byndyusoft
    cy.get('textarea[name="q"]')
      .should('be.visible')
      .type('Byndyusoft{enter}');

    // Переход по первой ссылке на сайт Byndyusoft
    cy.get('#search a')
      .first()
      .invoke('attr', 'href')
      .then((link) => {
        
        // Проверка доступности ссылки перед использованием cy.origin
        cy.request(link).then((response) => {
          expect(response.status).to.eq(200);  // Проверка, что ссылка доступна

          /* Cypress имеет ограничения на тестирование нескольких доменов 
        в одном тесте из-за политики same-origin (безопасности браузера, 
        которая запрещает выполнение действий между разными доменами).
        Пришлось использовать cy.origin, потому что он позволяет обойти это ограничение, 
        создавая новый "контекст" для выполнения команд на другом домене */

          cy.origin(link, { args: { link } }, ({ link }) => {
            // Дополнительные настройки для предотвращения зависания
            Cypress.config('pageLoadTimeout', 1200000); // Увеличиваем pageLoadTimeout

            // Посещение сайта Byndyusoft
            cy.visit(link, { failOnStatusCode: false });

            // Проверка появления основного контента после загрузки
            cy.get('body', { timeout: 30000 }).should('be.visible');

            // Прокрутка к блоку и клик
            cy.get('.knowMore__text')
              .scrollIntoView()
              .should('be.visible');

            cy.get('span.btn.btn--lg.btn--info.js-popup-callback-show')
              .click({ force: true });

            // Ожидание появления всплывающего окна
            cy.get('.popup-callback__contacts', { timeout: 10000 }).should('be.visible');

            // Проверка наличия ссылки на Telegram
            cy.get('.popup-callback__contacts a')
              .contains('в Телеграм')
              .should('have.attr', 'href', 'http://t.me/alexanderbyndyu')
              .should('have.attr', 'target', '_blank')
              .and('have.attr', 'rel', 'noopener noreferrer');
          });
        });
      });
  });
});

/* Тем не менее, этот тест не работает, я не понимаю, что препятствует загрузке основной страницы бындюсофт
  я увеличил всевозможныные таймауты, заблокировал ресурсы, которые не грузятся, использовал cy.origin, но попытки
  оживить - тщетны. Если Вас не устроит такой формат выполнения тестового задания и Вы не сделаете предложение о работе,
  я все еще буду очень рад развернутуму фидбеку и ревью этого недотеста, потому что я потратил на него слишком много времени... :) */

 
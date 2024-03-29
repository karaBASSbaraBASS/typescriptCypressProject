// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { keys } from "cypress/types/lodash";

// 5. Get Text Value Command
Cypress.Commands.add("getText", { prevSubject: "element" }, (prevSub) => {
  // return prevSub.text();
  cy.wrap(prevSub.text());
});

// 6. Get Table Cell Value
Cypress.Commands.add("getCellValue", (row, col) => {
  cy.get(`table#table1>tbody>tr:nth-child(${row})>td:nth-child(${col})`).then(
    (el) => {
      cy.wrap(el.text());
    }
  );
});

// 7. Get the body of iFrame
// Cypress.Commands.add("iframe", { prevSubject: "element" }, (iframe) => {
//   return new Cypress.Promise((resolve) => {
//     iframe.ready(() => {
//       resolve(iframe.contents().find("body"));
//     });
//   });
// });

// Custom AXE-CORE Logging
Cypress.Commands.add("customCheckAlly", () => {
  const severityIndicatorIcons = {
    minor: "⚪ minor",
    moderate: "🌕 moderate",
    serious: "⭕ serious",
    critical: "⛔ critical",
  };

	function callback(violations) {
		let violationList = [];
		violations.forEach((violation) => {
      const nodes = Cypress.$(
        violation.nodes.map((node) => node.target).join(",")
			);
			let violationGeneral = {
				name: `${severityIndicatorIcons[violation.impact]} AllY`,
        consoleProps: () => violation,
        $el: nodes,
				message: `[${violation.help}](${violation.helpUrl})`,
			}
			violationList.push(violationGeneral);
      Cypress.log(violationGeneral);

			violation.nodes.forEach(({ target }) => {
				let violationDetails = {
          name: "▶",
          consoleProps: () => violation,
          $el: Cypress.$(target.join(",")),
          message: target,
				}
				violationList.push(violationDetails);
        Cypress.log(violationDetails);
				//assert.notExists(violation, `${violation.help} --- ${target}`);
				console.error(`▶ violation = ${violation.help} target = ${target}`);
			});
		});
		assert.notExists(violations, `${violationList.map((item)=>`${item.name} ${item.message}`)} \\n \\n`);
  }

	cy.checkA11y(null, null, callback);
});
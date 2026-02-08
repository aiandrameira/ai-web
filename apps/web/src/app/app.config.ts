import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { currencyConfig } from "@public/config/currency.config";

import { appRoutes } from "./app.routes";

const providers = [currencyConfig];

export const appConfig: ApplicationConfig = {
    providers: [provideBrowserGlobalErrorListeners(), provideRouter(appRoutes), ...providers],
};

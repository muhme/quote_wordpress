#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# i18n-compile.sh - Compile from .po .mo files
#
# needs gettext package installed as already in quote_wp_wordpress container

echo "*** Create .po binary message catalog files"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/zitat-service/languages   && \
   msgfmt zitat-service-de.po -o zitat-service-de_DE.mo          && \
   msgfmt zitat-service-de.po -o zitat-service-de_DE_formal.mo   && \
   msgfmt zitat-service-de.po -o zitat-service-de_AT.mo          && \
   msgfmt zitat-service-de.po -o zitat-service-de_CH.mo          && \
   msgfmt zitat-service-de.po -o zitat-service-de_CH_informal.mo && \
   msgfmt zitat-service-es.po -o zitat-service-es_ES.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_CR.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_VE.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_AR.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_MX.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_CO.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_EC.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_PE.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_DO.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_CL.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_UY.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_PR.mo          && \
   msgfmt zitat-service-es.po -o zitat-service-es_GT.mo          && \
   msgfmt zitat-service-ja.po -o zitat-service-ja.mo             && \
   msgfmt zitat-service-uk.po -o zitat-service-uk.mo             && \
   chown www-data:www-data *                                     && \
   pwd                                                           && \
   ls -l *.mo"

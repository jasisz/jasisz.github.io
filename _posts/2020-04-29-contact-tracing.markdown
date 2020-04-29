---
layout: post
title:  "Dlaczego nie piszę się na Contact Tracing"
date:   2020-04-29 23:16:15 +0100
---

TLDR: Odradzam instalowanie aplikacji ProteGO Safe i innych aplikacji służących do śledzenia kontaktów w bieżącej ich formie.

## Co jest nie tak z ProteGO?

Od pierwszego dnia kiedy [otwarty kod pojawił się na GitHub](https://github.com/ProteGO-Safe) przyglądałem się temu projektowi i brałem aktywny
udział w dyskusjach o tym jak mogłaby wyglądać taka aplikacja, która byłaby możliwie bezpieczna i szanowała prywatność
użytkowników. Z kuriozalnych aspektów - musiałem podpisać oświadczenie dla Ministerstwa Cyfryzacji o licencji kodu
i podpisać je profilem zaufanym. Potem dostałem podziękowania, w których pojawiła sie pełna lista e-maili osób, które
podpisały podobne oświadczenie.

Ale niestety aplikacja, wbrew temu co było początkowo pisane, nie została wcale stworzona przez podobnych mi pasjonatów
czy specjalistów, którzy stworzyliby ją z altruistycznych pobudek. Pierwsza ekipa stwierdziła, że należy poczekać aż
pojawi się zapowiadane rozwiązanie od Google i Apple (o którym później) i de facto porzuciła projekt, który przejęła inna ekipa.

Obecny kod aplikacji jest czymś zupełnie innym, niezgodnym ze specyfikacją, która była wcześniej dyskutowana. Pojawił
się dość znienacka, aplikacja robi dużo rzeczy poza właściwym śledzeniem kontaktów (takie jak kwestionariusze do diagnozy),
co utrudnia jej ewentualne sprawdzenie przez niezależnych specjalistów, bo zaczyna to przypominać poszukiwanie igły
w stogu siana.

Użyte tam rozwiązanie do śledzenia kontaktów jest w mojej (i nie tylko mojej) opinii dalece niedoskonałe. Wzorowane jest
na rowiązaniu singapurskim.
Przede wszystkim jest ono scentralizowane. Jaki jest w tym problem? Mówiąc najprościej i obrazowo - w tym rozwiązaniu muszę zaufać, że po stronie
serwera wszystko jest tak jak mi napisało Ministerstwo, bo jest to kluczowy element działania aplikacji, ale jednocześnie
nie mam żadnej możliwości sprawdzenia czy tak jest naprawdę. Na serwerze może być odpalony kod, który odpowiedź
na kluczowe pytanie _czy miałem kontakt z zakażonym_ losuje sobie z kapelusza.

Sens działania takiej aplikacji jest też ograniczony przez to jak systemy mobilne zarządzają aplikacjami.
Aplikacje takie mogą zostać przez system operacyjny zwyczajnie zamknięte, kiedy system uzna to za stosowne.
Nie jestem specjalistą od aplikacji mobilnych, ale sama implementacja Bluetooth jest podatna na ataki, które muszą
najpierw zostać załatane. Tylko twórcy systemów i telefonów są w stanie poradzić sobie z tymi problemami.

## Co jest nie tak z rozwiązaniem Google i Apple?

To, że robi je Google i Apple. Brzmi kuriozalnie, bo przecież wcześniej narzekałem, że bez nich się nie da, ale już
spieszę z wyjaśnieniami.

Po pierwsze Google i Apple robią własne rozwiązanie, które chociaż jest mocno inspirowane m.in. [DP-3T](https://github.com/DP-3T/documents) stworzonym przez
naukowców, to jest za nim najprawdopodbniej w tyle. DP-3T jest ciągle dyskutowane, zmieniane, proponowane są inne
podejścia. Już poszło do przodu względem rowiązania Google i Apple, poprzez utrudnienie części ataków przez rozdzielanie
transmitowanego klucza na części.

Nie jest to też wcale rozwiązanie idealne, bo jest cała masa mniej lub bardziej wykonalnych ataków, które są dyskutowane
w DP-3T i [w innych miejscach](https://eprint.iacr.org/2020/399.pdf).

Ciekawostką jest to, że Google i Apple już dawno używały i proponowały podobne rozwiązania, tylko nie miały one wtedy
pomagać w walce z koronawirusem.
Czy [ten artykuł](https://content.sciendo.com/view/journals/popets/2019/3/article-p50.xml) wam coś przypomina?
A [może ten](https://qz.com/1169760/phone-data/)?

Dlaczego teraz stale właczony Bluetooth przedstawiajacy się w przestrzeni ma być dobry i pożądany?
Dużo lepszym podsumowaniem uwag będzie pewnie [ten post z EFF](https://www.eff.org/deeplinks/2020/04/apple-and-googles-covid-19-exposure-notification-api-questions-and-answers).

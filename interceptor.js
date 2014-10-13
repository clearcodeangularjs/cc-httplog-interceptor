/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-httpLogger-interceptor.

    cc-httpLogger-interceptor is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-httpLogger-interceptor is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-httpLogger-interceptor.  If not, see <http://www.gnu.org/licenses/>.

*/
  angular.module('cc.http.interceptor', [])
    .config(['$httpProvider', '$log', function ($httpProvider, $log) {
      $httpProvider.interceptors.push(['$q', function ($q) {
        return {
          response: function (r) {
            $log.log(r.status + '', r.config.method, r.config.url, r.config.params);
            return r || $q.when(r);
          },
          responseError: function (r) {
            if (r.status) {
              $log.log(r.status + '', r.config.method, r.config.url, r.config.params);
            }
            return $q.reject(r);
          },
          request: function (r) {
            if (r.data) {
              $log.log('BODY', r.method, r.url, r.data);
            }
            return r || $q.when(r);
          }
        };
      }]);
    }]);
